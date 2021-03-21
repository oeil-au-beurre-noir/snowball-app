import React, { useState } from 'react';
import AccordionDetails from '@material-ui/core/AccordionActions';
import Grid from '@material-ui/core/Grid';


const StakeSnob = ({ fromPage, pool, balanceSingle, sharesBalance,index}) => {
  let snobavaxDeposited = 0;
  if(pool.userInfo){
    snobavaxDeposited = pool.userInfo[0]
  };

  return (

    <AccordionDetails style={{ justifyContent: 'space-between' }}>
      <Grid container>

        <div>SNOB AVAX LP DEPOSIT WITHDRAWAL GOES HERE </div>


      </Grid>
    </AccordionDetails>
  );
};
const formatDecimals = number => {
  return number >= 10 ? number.toFixed(4) : number.isEqualTo(0) ? 0 : number.toFixed(8);
};
export default StakeSnob;
