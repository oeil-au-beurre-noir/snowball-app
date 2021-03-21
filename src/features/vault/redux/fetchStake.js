import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  VAULT_FETCH_STAKE_BEGIN,
  VAULT_FETCH_STAKE_SUCCESS,
  VAULT_FETCH_STAKE_FAILURE,
} from './constants';
import { stake } from '../../web3';

export function fetchStake({ web3, address, isAll, amount, poolId, index }) {
  return dispatch => {
    dispatch({
      type: VAULT_FETCH_STAKE_BEGIN,
      index,
    });

    const promise = new Promise((resolve, reject) => {
      stake({ web3, address, isAll, amount, poolId, dispatch })
        .then(data => {
          dispatch({
            type: VAULT_FETCH_STAKE_SUCCESS,
            data,
            index,
          });
          resolve(data);
        })
        .catch(error => {
          dispatch({
            type: VAULT_FETCH_STAKE_FAILURE,
            index,
          });
          reject(error.message || error);
        });
    });
    return promise;
  };
}

export function useFetchStake() {
  const dispatch = useDispatch();

  const { fetchStakePending } = useSelector(state => ({
    fetchStakePending: state.vault.fetchStakePending,
  }));

  const boundAction = useCallback(
    data => {
      return dispatch(fetchStake(data));
    },
    [dispatch]
  );


  return {
    fetchStake: boundAction,
    fetchStakePending,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case VAULT_FETCH_STAKE_BEGIN:
      return {
        ...state,
        fetchStakePending: {
          ...state.fetchStakePending,
          [action.index]: true,
        },
      };

    case VAULT_FETCH_STAKE_SUCCESS:
      return {
        ...state,
        fetchStakePending: {
          ...state.fetchStakePending,
          [action.index]: false,
        },
      };

    case VAULT_FETCH_STAKE_FAILURE:
      return {
        ...state,
        fetchStakePending: {
          ...state.fetchStakePending,
          [action.index]: false,
        },
      };

    default:
      return state;
  }
}
