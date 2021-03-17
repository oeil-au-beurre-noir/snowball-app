import { pools } from '../../configure';

const tokens = {};
const stakeTokens = {};

pools.forEach(({ token, tokenAddress, earnedToken, earnedTokenAddress,lockForSnob }) => {
  tokens[token] = {
    tokenAddress: tokenAddress,
    tokenBalance: 0,
  };
  tokens[earnedToken] = {
    tokenAddress: earnedTokenAddress,
    tokenBalance: 0,
  };

  if(lockForSnob){
    stakeTokens[earnedToken] = {
      tokenAddress: earnedTokenAddress,
      tokenAllowance: 0
    }
  }

});



const initialState = {
  pools,
  tokens,
  stakeTokens,
  apys: {},
  fetchApysDone: false,
  fetchApysPending: false,
  fetchVaultsDataDone: false,
  fetchVaultsDataPending: false,
  fetchBalancesDone: false,
  fetchBalancesPending: false,
  fetchAllowancesDone: false,
  fetchAllowancesPending: false,
  fetchApprovalPending: {},
  fetchDepositPending: {},
  fetchWithdrawPending: {},
  fetchHarvestPending: {},
  fetchStakingPending: {},
};

export default initialState;
