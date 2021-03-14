import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {useFetchHalfTime, useFetchPoolData} from '../redux/hooks';
import {
  Grid,
  Typography,
  Avatar,
  makeStyles,
  Box,
  Accordion,
  AccordionDetails,
} from '@material-ui/core';
import Disclaimer from '../../../components/Disclaimer/Disclaimer';
import Button from '../../../components/CustomButtons/Button';
import styles from './styles/list';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useConnectWallet } from '../../home/redux/hooks';
import {formatCountdown} from "../../helpers/format";

const useStyles = makeStyles(styles);

export default function StakePools(props) {
  const { fromPage } = props;
  const classes = useStyles();
  const { t } = useTranslation();
  const { pools } = useFetchPoolData();
  const { address } = useConnectWallet();
  const { halfTime, fetchHalfTime } = useFetchHalfTime();
  const [time, setTime] = React.useState(new Date())

  useEffect(() => {
    if (address) {
      const fetchEndPeriod = () => {
        for (const key in pools) {
          if(halfTime[key] === undefined || halfTime[key] === 0) {
            fetchHalfTime(key);
          }
        }
      }

      fetchEndPeriod();

      const id = setInterval(() => {
        fetchEndPeriod();
      }, 10000);
      return () => clearInterval(id);
    }
  }, [address, halfTime]);


  const [expanded, setExpanded] = React.useState('faq-1');

  const handleChange = panel => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  useEffect(() => {
    const fetchCountdown = () => {
      setTime(new Date())

      let obj = {}

      for (const key in pools) {
        if(halfTime[key] === undefined) {
          pools[key].countdown = pools[key].status === 'closed' ? t('Finished') : '';
          continue;
        }

        if(halfTime[key] === 0) {
          obj = {status: 'soon', countdown: t('Coming-Soon')};
        } else {
          const deadline = halfTime[key] * 1000;
          const diff = deadline - time;

          obj = diff > 0 ? {status: 'active', countdown: formatCountdown(deadline)} : {status: 'closed', countdown: t('Finished')};
        }

        pools[key].status = obj.status;
        pools[key].countdown = obj.countdown;
      }
    }

    fetchCountdown();

    const id = setInterval(() => {
      fetchCountdown()
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <Grid container>
      <Grid item xs={12}>
        <div className={classes.launchpool}>
          <img alt="Launchpool" src={require('../../../images/stake/launchpool.png')} />
        </div>
      </Grid>
      <Grid container spacing={4} justify={'center'}>
        {pools.map((pool, index) => (
          <Grid xs={12} sm={6} md={6} lg={3} key={index} item>
            <Grid
              className={[
                classes.item,
                pools[index].status === 'closed' ?
                  classes.itemRetired : (pools[index].status === 'soon' ? classes.itemSoon : ''),
              ].join(' ')}
            >
              {pool.partnership ? (
                <Box className={classes.boosted}>Boosted by {pool.name}</Box>
              ) : (
                ''
              )}
              <Typography className={classes.title} variant="body2" gutterBottom>
                Earn {pool.earnedToken}
              </Typography>
              <Avatar
                src={require('../../../images/' + pool.logo)}
                alt={pool.earnedToken}
                variant="square"
                imgProps={{ style: { objectFit: 'contain' } }}
              />

              <Typography className={classes.countdown}>
                {pools[index].hideCountdown ? '' : (
                    pools[index].countdown
                )}
              </Typography>

              <Typography className={classes.subtitle} variant="body2">
                {pool.token}
              </Typography>
              <Button disabled={pools[index].status === 'soon'} xs={5} md={2} className={classes.stakeBtn} href={`/stake/pool/${index + 1}`}>
                {pools[index].status === 'closed'
                  ? t('Stake-Button-Claim')
                  : t('Stake-Button-Stake')}
              </Button>
              {pools[index].status === 'closed' || pools[index].status === 'soon' ? (
                <Box className={classes.ribbon}>
                  <span className={pools[index].status}>{pools[index].countdown}</span>
                </Box>
              ) : (
                ''
              )}
            </Grid>
          </Grid>
        ))}
      </Grid>

    </Grid>
  );
}

StakePools.defaultProps = {
  fromPage: 'page',
};
