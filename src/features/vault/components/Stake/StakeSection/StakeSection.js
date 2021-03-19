import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import BigNumber from 'bignumber.js';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import { useSnackbar } from 'notistack';

import CustomOutlinedInput from 'components/CustomOutlinedInput/CustomOutlinedInput';
import { useFetchDeposit, useFetchApproval, useFetchStaking } from 'features/vault/redux/hooks';
import CustomSlider from 'components/CustomSlider/CustomSlider';
import { useConnectWallet } from 'features/home/redux/hooks';
import { inputLimitPass, inputFinalVal, shouldHideFromHarvest } from 'features/helpers/utils';
import { byDecimals, calculateReallyNum, format } from 'features/helpers/bignumber';
import Button from 'components/CustomButtons/Button.js';
import styles from './styles';

const useStyles = makeStyles(styles);

const StakeSection = ({ pool, index, balanceSingle,sharesBalance }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const { web3, address } = useConnectWallet();
  const { enqueueSnackbar } = useSnackbar();
  const { fetchApproval, fetchApprovalPending } = useFetchApproval();
  const { fetchDeposit, fetchDepositBnb, fetchDepositPending } = useFetchDeposit();
  const { fetchStaking,fetchStakingPending } = useFetchStaking();
  const [depositBalance, setDepositBalance] = useState({
    amount: 0,
    slider: 0,
  });

  const handleDepositedBalance = (_, sliderNum) => {

    const total = byDecimals(sharesBalance.toNumber(), pool.tokenDecimals)  ;

    setDepositBalance({
      amount: sliderNum === 0 ? 0 : calculateReallyNum(total, sliderNum),
      slider: sliderNum,
    });


  };


  const onDeposit = isAll => {

    console.log("GOTCHA",isAll, sharesBalance);

    if (isAll) {
      setDepositBalance({
        amount: format(sharesBalance),
        slider: 100,
      });
    }


    if (pool.depositsPaused) {
      console.error('Deposits paused!');
      return;
    }

    let amountValue = depositBalance.amount
      ? depositBalance.amount.replace(',', '')
      : depositBalance.amount;

    fetchStaking({
        address,
        web3,
        poolId: pool.poolId,
        amount: new BigNumber(amountValue)
          .multipliedBy(new BigNumber(10).exponentiatedBy(pool.tokenDecimals))
          .toString(10),
        index
    }).then(() => enqueueSnackbar(t('Vault-DepositSuccess'), { variant: 'success' }))
      .catch(error => enqueueSnackbar(t('Vault-DepositError', { error }), { variant: 'error' }));

  }



  const changeDetailInputValue = event => {
    let value = event.target.value;
    const total = byDecimals(sharesBalance.toNumber(),pool.tokenDecimals);

    if (!inputLimitPass(value, pool.tokenDecimals)) {
      return;
    }

    let sliderNum = 0;
    let inputVal = 0;
    if (value) {
      inputVal = Number(value.replace(',', ''));
      sliderNum = byDecimals(inputVal / total, 0).toFormat(2) * 100;
    }

    setDepositBalance({
      amount: inputFinalVal(value, total, pool.tokenDecimals),
      slider: sliderNum,
    });
  };

  const getVaultState = (status, paused) => {
    let display = false
    let cont = null

    if(status === 'eol') {
      display = true;
      cont = <div className={classes.showDetailButtonCon}>
        <div className={classes.showRetiredMsg}>{t('Vault-DepositsRetiredMsg')}</div>
      </div>
    } else {
      if(paused) {
        display = true;
        cont = <div className={classes.showDetailButtonCon}>
          <div className={classes.showPausedMsg}>{t('Vault-DepositsPausedMsg')}</div>
        </div>
      }
    }

    return {display:display, content: cont}
  }

  const vaultState = getVaultState(pool.status, pool.depositsPaused);

  return (
    <Grid item xs={12} md={shouldHideFromHarvest(pool.id) ? 6 : 5} className={classes.sliderDetailContainer}>
      <div className={classes.showDetailLeft}>
        Available to deposit: {sharesBalance / 1e18}
      </div>
      <FormControl fullWidth variant="outlined" className={classes.numericInput}>
        <CustomOutlinedInput value={depositBalance.amount} onChange={changeDetailInputValue} />
      </FormControl>
      <CustomSlider
        aria-labelledby="continuous-slider"
        value={depositBalance.slider}
        onChange={handleDepositedBalance}
      />
      {vaultState.display === true ? vaultState.content : (
        <div>
          {pool.stakeAllowance > 0 ?
            <div className={classes.showDetailButtonCon}>
            <Button
              className={`${classes.showDetailButton} ${classes.showDetailButtonOutlined}`}
              color="primary"
              disabled={
                pool.depositsPaused ||
                !Boolean(depositBalance.amount) ||
                fetchDepositPending[index] ||
                new BigNumber(depositBalance.amount).toNumber() > sharesBalance.toNumber()
              }
              onClick={() => onDeposit(false)}
            >
              {t('Vault-DepositButton')}
            </Button>
            {/*
                Boolean(pool.tokenAddress) && (
                <Button
                  className={`${classes.showDetailButton} ${classes.showDetailButtonContained}`}
                  disabled={
                    pool.depositsPaused ||
                    fetchDepositPending[index] ||
                    new BigNumber(depositBalance.amount).toNumber() > balanceSingle.toNumber()
                  }
                  onClick={() => onDeposit(true)}
                >
                  {t('Vault-DepositButtonAll')}
                </Button>
              )*/}
          </div>
            :
            <div>APPROVE BUTTON</div>
          }
        </div>
      )}
      {pool.platform === 'Autofarm' ? <h3 className={classes.subtitle}>{t('Vault-DepositFee')}</h3> : ''}
    </Grid>
  );
};

export default StakeSection;
