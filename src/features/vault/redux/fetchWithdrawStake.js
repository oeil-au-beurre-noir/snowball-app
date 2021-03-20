import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  VAULT_FETCH_WITHDRAW_STAKE_BEGIN,
  VAULT_FETCH_WITHDRAW_STAKE_SUCCESS,
  VAULT_FETCH_WITHDRAW_STAKE_FAILURE,
} from './constants';
import { stake } from '../../web3';

export function fetchWithdrawStake({ web3, address, isAll, amount, poolId, index }) {
  return dispatch => {
    dispatch({
      type: VAULT_FETCH_WITHDRAW_STAKE_BEGIN,
      index,
    });

    const promise = new Promise((resolve, reject) => {
      stake({ web3, address, isAll, amount, poolId, dispatch })
        .then(data => {
          dispatch({
            type: VAULT_FETCH_WITHDRAW_STAKE_SUCCESS,
            data,
            index,
          });
          resolve(data);
        })
        .catch(error => {
          dispatch({
            type: VAULT_FETCH_WITHDRAW_STAKE_FAILURE,
            index,
          });
          reject(error.message || error);
        });
    });
    return promise;
  };
}

export function useFetchWithdrawStake() {
  const dispatch = useDispatch();

  const { fetchWithdrawStakePending } = useSelector(state => ({
    fetchWithdrawStakePending: state.vault.fetchWithdrawStakePending,
  }));

  const boundAction = useCallback(
    data => {
      return dispatch(fetchWithdrawStake(data));
    },
    [dispatch]
  );


  return {
    fetchWithdrawStake: boundAction,
    fetchWithdrawStakePending,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case VAULT_FETCH_WITHDRAW_STAKE_BEGIN:
      return {
        ...state,
        fetchWithdrawStakePending: {
          ...state.fetchWithdrawStakePending,
          [action.index]: true,
        },
      };

    case VAULT_FETCH_WITHDRAW_STAKE_SUCCESS:
      return {
        ...state,
        fetchWithdrawStakePending: {
          ...state.fetchWithdrawStakePending,
          [action.index]: false,
        },
      };

    case VAULT_FETCH_WITHDRAW_STAKE_FAILURE:
      return {
        ...state,
        fetchWithdrawStakePending: {
          ...state.fetchWithdrawStakePending,
          [action.index]: false,
        },
      };

    default:
      return state;
  }
}
