import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  VAULT_FETCH_STAKE_BEGIN,
  VAULT_FETCH_STAKE_SUCCESS,
  VAULT_FETCH_STAKE_FAILURE,
} from './constants';
import { stake  } from '../../web3';

export function fetchStaking({ web3, address, poolId, amount,index }) {
  return dispatch => {
    dispatch({
      type: VAULT_FETCH_STAKE_BEGIN,
      index,
    });

    const promise = new Promise((resolve, reject) => {
      stake({ web3, address,poolId, amount, dispatch })
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

export function useFetchStaking() {
  const dispatch = useDispatch();

  const { fetchStakingPending } = useSelector(state => ({
    fetchStakingPending: state.vault.fetchStakingPending,
  }));

  const boundAction = useCallback(
    data => {
      return dispatch(fetchStaking(data));
    },
    [dispatch]
  );

  /*
  const boundAction2 = useCallback(
    data => {
      return dispatch(fetchDepositBnb(data));
    },
    [dispatch]
  );
  */


  return {
    fetchStaking: boundAction,
    fetchStakingPending,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case VAULT_FETCH_STAKE_BEGIN:
      return {
        ...state,
        fetchStakingPending: {
          ...state.fetchStakingPending,
          [action.index]: true,
        },
      };

    case VAULT_FETCH_STAKE_SUCCESS:
      return {
        ...state,
        fetchStakingPending: {
          ...state.fetchStakingPending,
          [action.index]: false,
        },
      };

    case VAULT_FETCH_STAKE_FAILURE:
      return {
        ...state,
        fetchStakingPending: {
          ...state.fetchStakingPending,
          [action.index]: false,
        },
      };

    default:
      return state;
  }
}
