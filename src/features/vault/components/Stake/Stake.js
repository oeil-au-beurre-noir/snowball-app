import React, { useState } from 'react';
import AccordionDetails from '@material-ui/core/AccordionActions';
import Grid from '@material-ui/core/Grid';
import StakeSection from './StakeSection/StakeSection';
import DepositSection from '../PoolDetails/DepositSection/DepositSection';
import { useFetchApproval } from '../../redux/fetchApproval';


const Stake = ({ fromPage, pool, balanceSingle, sharesBalance,tokenAllowance, index}) => {
  const { fetchApproval, fetchApprovalPending } = useFetchApproval();
  return (

    <AccordionDetails style={{ justifyContent: 'space-between' }}>
      <Grid container>

        {sharesBalance > 0 &&
          <>
          <StakeSection index={index} pool={pool} balanceSingle={balanceSingle} sharesBalance={sharesBalance}/>
            { tokenAllowance > 0 &&
            <div>Hello{tokenAllowance}</div>
            }

          </>

        }
        {sharesBalance == 0 &&
        <div>YOU NEED TO DEPOSIT IN {pool.name} before you can stake for SNOB </div>
        }

      </Grid>
    </AccordionDetails>
  );
};
const formatDecimals = number => {
  return number >= 10 ? number.toFixed(4) : number.isEqualTo(0) ? 0 : number.toFixed(8);
};
export default Stake;
