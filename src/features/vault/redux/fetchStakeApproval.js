import { useCallback } from 'react';
import {iceQueenAddress} from '../../configure';
import { useDispatch, useSelector } from 'react-redux';
import {
  VAULT_FETCH_STAKE_APPROVAL_BEGIN,
  VAULT_FETCH_STAKE_APPROVAL_SUCCESS,
  VAULT_FETCH_STAKE_APPROVAL_FAILURE,
} from './constants';
import { approval } from '../../web3';

export function fetchStakeApproval({ address, web3, earnedTokenAddress, index }) {
  return dispatch => {
    dispatch({
      type: VAULT_FETCH_STAKE_APPROVAL_BEGIN,
      index,
    });

    const tokenAddress = earnedTokenAddress
    const contractAddress = iceQueenAddress

    const promise = new Promise((resolve, reject) => {
      approval({
        web3,
        address,
        tokenAddress,
        contractAddress,
        dispatch,
      })
        .then(data => {
          dispatch({
            type: VAULT_FETCH_STAKE_APPROVAL_SUCCESS,
            data: { index, allowance: data },
            index,
          });
          resolve();
        })
        .catch(error => {
          dispatch({
            type: VAULT_FETCH_STAKE_APPROVAL_FAILURE,
            index,
          });
          reject(error.message || error);
        });
    });

    return promise;
  };
}

export function useFetchStakeApproval() {
  const dispatch = useDispatch();

  const { fetchStakeApprovalPending } = useSelector(state => ({
    fetchStakeApprovalPending: state.vault.fetchStakeApprovalPending,
  }));

  const boundAction = useCallback(data => dispatch(fetchStakeApproval(data)), [dispatch]);

  return {
    fetchStakeApproval: boundAction,
    fetchStakeApprovalPending,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case VAULT_FETCH_STAKE_APPROVAL_BEGIN:
      return {
        ...state,
        fetchStakeApprovalPending: {
          ...state.fetchStakeApprovalPending,
          [action.index]: true,
        },
      };

    case VAULT_FETCH_STAKE_APPROVAL_SUCCESS:
      const { pools } = state;
      pools[action.index].allowance = action.data.allowance;
      return {
        ...state,
        pools,
        fetchStakeApprovalPending: {
          ...state.fetchStakeApprovalPending,
          [action.index]: false,
        },
      };

    case VAULT_FETCH_STAKE_APPROVAL_FAILURE:
      return {
        ...state,
        fetchStakeApprovalPending: {
          ...state.fetchStakeApprovalPending,
          [action.index]: false,
        },
      };

    default:
      return state;
  }
}
