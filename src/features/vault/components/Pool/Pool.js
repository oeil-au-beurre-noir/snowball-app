import React, { useState, useCallback, memo } from 'react';
import Accordion from '@material-ui/core/Accordion';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import BigNumber from 'bignumber.js';

import { byDecimals } from 'features/helpers/bignumber';
import PoolSummary from '../PoolSummary/PoolSummary';
import PoolDetails from '../PoolDetails/PoolDetails';
import Stake from '../Stake/Stake';
import styles from './styles';

const useStyles = makeStyles(styles);

const Pool = ({
  pool,
  poolsInfo,
  index,
  tokens,
  stakeTokens,
  apy,
  fetchBalancesDone,
  fetchApysDone,
  fetchVaultsDataDone,
  fromPage
}) => {
  const classes = useStyles();

  const [isOpen, setIsOpen] = useState(index === 0);
  const toggleCard = useCallback(() => setIsOpen(!isOpen), [isOpen]);

  let balanceSingle = byDecimals(tokens[pool.token].tokenBalance, pool.tokenDecimals);
  let sharesBalance = new BigNumber(tokens[pool.earnedToken].tokenBalance);

  let tokenAllowance = 0

  if(pool.lockForSnob){
    let tokenAllowance = new BigNumber(stakeTokens[pool.earnedToken].tokenAllowance);
    console.log(tokenAllowance)
  }


  const checkLaunchpool = () => {
    for (let index in poolsInfo) {
      if(pool.launchpool && poolsInfo[index].id === pool.launchpool) {
        poolsInfo[index].poolIndex = Number(index) + 1;
        return poolsInfo[index];
      }
    }
  }

  return (
    <Grid item xs={12} container key={index} className={classes.container} spacing={0}>
      {pool.allowance} {pool.stakeAllowance}
      <Accordion
        expanded={isOpen}
        className={classes.accordion}
        square={true}
        TransitionProps={{ unmountOnExit: true }}
      >
        <PoolSummary
          pool={pool}
          launchpool={checkLaunchpool()}
          balanceSingle={balanceSingle}
          toggleCard={toggleCard}
          isOpen={isOpen}
          sharesBalance={sharesBalance}
          apy={apy}
          fetchBalancesDone={fetchBalancesDone}
          fetchApysDone={fetchApysDone}
          fetchVaultsDataDone={fetchVaultsDataDone}
        />
        <Divider variant="middle" className={classes.divider} />
        {fromPage == 'snowglobes' &&
        <PoolDetails
          pool={pool}
          balanceSingle={balanceSingle}
          sharesBalance={sharesBalance}
          index={index}
        />
        }
        {fromPage == 'icequeen' &&
        <Stake
          fromPage={fromPage}
          pool={pool}
          balanceSingle={balanceSingle}
          sharesBalance={sharesBalance}
          tokenAllowance={tokenAllowance}
          index={index}
        />
        }

      </Accordion>
    </Grid>
  );
};

export default memo(Pool);
