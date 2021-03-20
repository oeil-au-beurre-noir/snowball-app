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
import { useFetchWithdraw } from 'features/vault/redux/hooks';
import { useConnectWallet } from 'features/home/redux/hooks';
import styles from './styles';

const useStyles = makeStyles(styles);

const WithdrawSection = ({ pool, index, sharesBalance }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const { web3, address } = useConnectWallet();
  const { enqueueSnackbar } = useSnackbar();
  const { fetchWithdraw, fetchWithdrawBnb, fetchWithdrawPending } = useFetchWithdraw();
  const { fetchWithdrawStake, fetchWithdrawStakePending } = useFetchWithdraw();
  const [withdrawStakeAmount, setWithdrawStakeAmount] = useState({ amount: 0, slider: 0 });

  const onSliderChange = (_, sliderNum) => {
    const total = sharesBalance
      .multipliedBy(new BigNumber(pool.pricePerFullShare))
      .dividedBy(new BigNumber(10).exponentiatedBy(pool.tokenDecimals));

    setWithdrawStakeAmount({
      amount: sliderNum === 0 ? 0 : calculateReallyNum(total, sliderNum),
      slider: sliderNum,
    });
  };

  const onInputChange = event => {
    const value = event.target.value;
    const total = sharesBalance
      .multipliedBy(new BigNumber(pool.pricePerFullShare))
      .dividedBy(new BigNumber(10).exponentiatedBy(pool.tokenDecimals));

    if (!inputLimitPass(value, pool.tokenDecimals)) {
      return;
    }

    let inputVal = 0;
    let sliderNum = 0;
    if (value) {
      inputVal = Number(value.replace(',', ''));
      sliderNum = Math.round(byDecimals(inputVal / total, 0).toNumber() * 100);
    }

    setWithdrawStakeAmount({
      amount: inputFinalVal(value, total, pool.tokenDecimals),
      slider: sliderNum,
    });
  };

  const onWithdraw = isAll => {
    if (isAll) {
      setWithdrawStakeAmount({
        amount: pool.userInfo[0],
        slider: 100,
      });
    }

    if (withdrawStakeAmount.slider >= 99) {
      isAll = true;
    }

    const amountValue = withdrawStakeAmount.amount
      ? withdrawStakeAmount.amount.replace(',', '')
      : withdrawStakeAmount.amount;

      fetchWithdrawStake({
        address,
        web3,
        isAll,
        amount: new BigNumber(amountValue)
          .multipliedBy(new BigNumber(10).exponentiatedBy(pool.tokenDecimals))
          .dividedBy(pool.pricePerFullShare)
          .toFixed(0),
        contractAddress: pool.earnContractAddress,
        index,
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
        <CustomOutlinedInput value={withdrawStakeAmount.amount} onChange={onInputChange} />
      </FormControl>
      <CustomSlider
        aria-labelledby="continuous-slider"
        value={withdrawStakeAmount.slider}
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
              {fetchWithdrawStakePending[index]
                ? `${t('Vault-Withdrawing')}`
                : `${t('Vault-WithdrawButton')}`}
            </Button>
            <Button
              className={`${classes.showDetailButton} ${classes.showDetailButtonOutlined}`}
              type="button"
              color="primary"
              onClick={() => onWithdraw(true)}
            >
              {fetchWithdrawStakePending[index]
                ? `${t('Vault-Withdrawing')}`
                : `${t('Vault-WithdrawButtonAll')}`}
            </Button>
          </>

      </div>
    </Grid>
  )
};

export default WithdrawSection;
