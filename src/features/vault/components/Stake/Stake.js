import React, { useState } from 'react';
import AccordionDetails from '@material-ui/core/AccordionActions';
import Grid from '@material-ui/core/Grid';
import StakeSection from './StakeSection/StakeSection';
import WithdrawStakeSection from './WithdrawStakeSection/WithdrawStakeSection';
import {stakeActionDisplay} from '../../../helpers/poolDisplay';
import PoolDetails from '../PoolDetails/PoolDetails';
import DepositSection from '../PoolDetails/DepositSection/DepositSection';
import WithdrawSection from '../PoolDetails/WithdrawSection/WithdrawSection';
import { shouldHideFromHarvest } from '../../../helpers/utils';
import HarvestSection from '../PoolDetails/HarvestSection/HarvestSection';
import Accordion from '@material-ui/core/Accordion';

const Stake = ({ fromPage, pool, balanceSingle, sharesBalance,index}) => {
  let spglDeposited = 0;
  if(pool.userInfo){
    spglDeposited = pool.userInfo[0]
  };



  return (

    <AccordionDetails style={{ justifyContent: 'space-between' }}>
      <Grid container>
        {stakeActionDisplay(fromPage, pool, sharesBalance,spglDeposited ) &&

          <>
          <StakeSection index={index} pool={pool} balanceSingle={balanceSingle} sharesBalance={sharesBalance}/>
          <WithdrawStakeSection index={index} pool={pool} balanceSingle={balanceSingle} sharesBalance={sharesBalance}/>
          </>

        }
        {sharesBalance == 0  && pool.poolId !=2 &&
        <div>YOU NEED TO DEPOSIT IN {pool.name}  before you can stake for SNOB</div>
        }

        { pool.poolId === 2 &&


        <PoolDetails
          pool={pool}
          balanceSingle={balanceSingle}
          sharesBalance={sharesBalance}
          index={index}
        />

        }

      </Grid>
    </AccordionDetails>
  );
};
const formatDecimals = number => {
  return number >= 10 ? number.toFixed(4) : number.isEqualTo(0) ? 0 : number.toFixed(8);
};
export default Stake;
