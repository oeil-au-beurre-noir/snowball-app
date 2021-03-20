import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import BigNumber from 'bignumber.js';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import { useSnackbar } from 'notistack';
import FormControl from '@material-ui/core/FormControl';

import Button from 'components/CustomButtons/Button.js';
import CustomOutlinedInput from 'components/CustomOutlinedInput/CustomOutlinedInput';
import CustomSlider from 'components/CustomSlider/CustomSlider';
import RefundButtons from '../../PoolDetails/RefundButtons/RefundButtons';
import { byDecimals, calculateReallyNum, format } from 'features/helpers/bignumber';
import { inputLimitPass, inputFinalVal, shouldHideFromHarvest } from 'features/helpers/utils';
import { useFetchWithdrawStake } from 'features/vault/redux/hooks';
import { useConnectWallet } from 'features/home/redux/hooks';
import styles from './styles';

const useStyles = makeStyles(styles);

const WithdrawSection = ({ pool, index, sharesBalance }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const { web3, address } = useConnectWallet();
  const { enqueueSnackbar } = useSnackbar();
  const { fetchWithdrawStake, fetchWithdrawStakePending } = useFetchWithdrawStake();
  const [withdrawAmount, setWithdrawAmount] = useState({ amount: 0, slider: 0 });

  const onSliderChange = (_, sliderNum) => {
    const total_raw = new BigNumber(pool.userInfo[0])

    const total = total_raw
      .multipliedBy(new BigNumber(pool.pricePerFullShare))
      .dividedBy(new BigNumber(10).exponentiatedBy(pool.tokenDecimals));

    setWithdrawAmount({
      amount: sliderNum === 0 ? 0 : calculateReallyNum(total, sliderNum),
      slider: sliderNum,
    });
  };

  const onInputChange = event => {
    const value = event.target.value;
    const total = pool.userInfo[0]

    if (!inputLimitPass(value, pool.tokenDecimals)) {
      return;
    }

    let inputVal = 0;
    let sliderNum = 0;
    if (value) {
      inputVal = Number(value.replace(',', ''));
      sliderNum = Math.round(byDecimals(inputVal / total, 0).toNumber() );
    }

    setWithdrawAmount({
      amount: inputFinalVal(value, total, pool.tokenDecimals),
      slider: sliderNum,
    });
  };

  const onWithdraw = isAll => {
    if (isAll) {
      const total_raw = new BigNumber(pool.userInfo[0])

      const total = total_raw
        .multipliedBy(new BigNumber(pool.pricePerFullShare))
        .dividedBy(new BigNumber(10).exponentiatedBy(pool.tokenDecimals));

      setWithdrawAmount({
        amount: total,
        slider: 100,
      });
    }

    if (withdrawAmount.slider >= 99) {
      isAll = true;
    }

    const amountValue = withdrawAmount.amount
      ? withdrawAmount.amount.replace(',', '')
      : withdrawAmount.amount;

      fetchWithdrawStake({
        web3,
        address,
        amount: new BigNumber(amountValue)
          .multipliedBy(new BigNumber(10).exponentiatedBy(pool.tokenDecimals))
          .dividedBy(pool.pricePerFullShare)
          .toFixed(0),
        poolId: pool.poolId,
        index
      })
        .then(() => enqueueSnackbar(t('Vault-WithdrawSuccess'), { variant: 'success' }))
        .catch(error => enqueueSnackbar(t('Vault-WithdrawError', { error }), { variant: 'error' }));

    }


  return (
    <Grid item xs={12} md={shouldHideFromHarvest(pool.name) ? 6 : 5} className={classes.sliderDetailContainer}>

      <div className={classes.showDetailLeft}>
        Deposited:
        {Number(pool.userInfo[0] /1e18).toFixed(2)}
        &nbsp;
        sPGL


      </div>
      <br/>


      <FormControl fullWidth variant="outlined">
        <CustomOutlinedInput value={withdrawAmount.amount} onChange={onInputChange} />
      </FormControl>
      <CustomSlider
        aria-labelledby="continuous-slider"
        value={withdrawAmount.slider}
        onChange={onSliderChange}
      />
      <div className={classes.showDetailButtonCon}>
          <>
            <Button
              className={`${classes.showDetailButton} ${classes.showDetailButtonOutlined}`}
              type="button"
              color="primary"
              onClick={() => onWithdraw(false)}
            >
              WITHDRAW
            </Button>
            <Button
              className={`${classes.showDetailButton} ${classes.showDetailButtonOutlined}`}
              type="button"
              color="primary"
              onClick={() => onWithdraw(true)}
            >
              WITHDRAW ALL
            </Button>
          </>

      </div>
    </Grid>
  )
};

export default WithdrawSection;
