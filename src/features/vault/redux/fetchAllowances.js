import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  VAULT_FETCH_ALLOWANCES_BEGIN,
  VAULT_FETCH_ALLOWANCES_SUCCESS,
  VAULT_FETCH_ALLOWANCES_FAILURE,
} from './constants';
import { MultiCall } from 'eth-multicall';
import { snowGlobeABI, iceQueenAddress } from '../../configure';
import BigNumber from 'bignumber.js';

export function fetchAllowances({ address, web3, stakeTokens }) {
  return dispatch => {
    dispatch({
      type: VAULT_FETCH_ALLOWANCES_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const stakeTokensList = [];
      for (let key in stakeTokens) {
        stakeTokensList.push({
          token: key,
          tokenAddress: stakeTokens[key].tokenAddress,
          tokenAllowance: stakeTokens[key].tokenAllowance,
        });
      }

      const multicall = new MultiCall(web3, '0xfca8Cd986b0Db175dec97C6A0A02dd7e4299eC68');

      const calls = stakeTokensList.map(token => {

          const tokenContract = new web3.eth.Contract(snowGlobeABI, token.tokenAddress);

          return {
            tokenAllowance: tokenContract.methods.allowance(address,iceQueenAddress),
          };

      });

      multicall
        .all([calls])
        .then(([results]) => {
          const newTokens = {};
          for (let i = 0; i < stakeTokensList.length; i++) {
            newTokens[stakeTokensList[i].token] = {
              tokenAddress: stakeTokensList[i].tokenAddress,
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

export function useFetchAllowances() {
  const dispatch = useDispatch();

  const { stakeTokens, fetchAllowancesPending, fetchAllowancesDone } = useSelector(
    state => ({
      stakeTokens: state.vault.stakeTokens,
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
    stakeTokens,
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
        stakeTokens: action.data,
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
