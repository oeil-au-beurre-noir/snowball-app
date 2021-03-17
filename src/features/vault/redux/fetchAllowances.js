import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  VAULT_FETCH_ALLOWANCES_BEGIN,
  VAULT_FETCH_ALLOWANCES_SUCCESS,
  VAULT_FETCH_ALLOWANCES_FAILURE,
} from './constants';
import { MultiCall } from 'eth-multicall';
import { snowGlobeABI, multicallBnbShimABI, iceQueenAddress } from '../../configure';
import BigNumber from 'bignumber.js';

export function fetchAllowances({ address, web3, tokens }) {
  return dispatch => {
    dispatch({
      type: VAULT_FETCH_ALLOWANCES_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const tokensList = [];
      for (let key in tokens) {
        tokensList.push({
          token: key,
          tokenAddress: tokens[key].tokenAddress,
          tokenAllowance: tokens[key].tokenAllowance,
        });
      }

      const multicall = new MultiCall(web3, '0xfca8Cd986b0Db175dec97C6A0A02dd7e4299eC68');

      const calls = tokensList.map(token => {
          const tokenContract = new web3.eth.Contract(snowGlobeABI, token.tokenAddress);
          return {
            tokenAllowance: tokenContract.methods.allowance(iceQueenAddress),
          };

      });

      multicall
        .all([calls])
        .then(([results]) => {
          const newTokens = {};
          for (let i = 0; i < tokensList.length; i++) {
            newTokens[tokensList[i].token] = {
              tokenAddress: tokensList[i].tokenAddress,
              tokenAllowance: new BigNumber(results[i].tokenAllowance).toNumber() || 0,
            };
          }

          dispatch({
            type: VAULT_FETCH_ALLOWANCES_SUCCESS,
            data: newTokens,
          });
          resolve();
        })
        .catch(error => {
          dispatch({
            type: VAULT_FETCH_ALLOWANCES_FAILURE,
          });
          return reject(error.message || error);
        });
    });

    return promise;
  };
}

export function useFetchBalances() {
  const dispatch = useDispatch();

  const { tokens, fetchAllowancesPending, fetchAllowancesDone } = useSelector(
    state => ({
      tokens: state.vault.tokens,
      fetchAllowancesDone: state.vault.fetchAllowancesDone,
      fetchAllowancesPending: state.vault.fetchAllowancesPending,
    }),
    shallowEqual
  );

  const boundAction = useCallback(
    data => {
      return dispatch(fetchAllowances(data));
    },
    [dispatch]
  );

  return {
    tokens,
    fetchAllowances: boundAction,
    fetchAllowancesDone,
    fetchAllowancesPending,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case VAULT_FETCH_ALLOWANCES_BEGIN:
      return {
        ...state,
        fetchAllowancesPending: true,
      };

    case VAULT_FETCH_ALLOWANCES_SUCCESS:
      return {
        ...state,
        tokens: action.data,
        fetchAllowancesDone: true,
        fetchAllowancesPending: false,
      };

    case VAULT_FETCH_ALLOWANCES_FAILURE:
      return {
        ...state,
        fetchAllowancesPending: false,
      };

    default:
      return state;
  }
}
