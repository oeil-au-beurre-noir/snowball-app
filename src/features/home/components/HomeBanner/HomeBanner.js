import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import styles from './styles';
import TotalSupply from '../TotalSupply/TotalSupply';
import TotalValueLocked from '../TotalValueLocked/TotalValueLocked';
import Button from 'components/CustomButtons/Button.js';
import BigNumber from 'bignumber.js';

const useStyles = makeStyles(styles);

const HomeBanner = () => {
  //const { t } = useTranslation();
  const classes = useStyles();

  return (
    <Grid container item className={classes.root} justify="center">
      <Grid item xs={12}>
        <Grid container justify="center" spacing={2}>
          <Grid  item>
            <TotalValueLocked/>
          </Grid>
          <Grid  item>
              <TotalSupply/>
          </Grid>
        </Grid>
      </Grid>


      <Button
        className={`${classes.showDetailButton} ${classes.showDetailButtonContained}`}
        href="/snowglobes"
      >
       Launch App
      </Button>
      <Button
        className={`${classes.showDetailButton} ${classes.showDetailButtonOutlined}`}
        color="primary"
        href="https://snowballs.gitbook.io/snowball-finance-docs/"
        // onClick={() => onDeposit(false)}
      >
        Litepaper
      </Button>
    </Grid>
  );
};

export default memo(HomeBanner);

