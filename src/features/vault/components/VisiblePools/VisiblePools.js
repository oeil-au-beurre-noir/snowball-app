import React from 'react';

import InfiniteScroll from 'react-infinite-scroll-component';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import styles from './styles';

import useFilteredPools from '../../hooks/useFilteredPools';
import usePoolsByPlatform from '../../hooks/usePoolsByPlatform';
import usePoolsByVaultType from '../../hooks/usePoolsByVaultType';
import usePoolsByAsset from '../../hooks/usePoolsByAsset';
import useSortedPools from '../../hooks/useSortedPools';
import useVisiblePools from '../../hooks/useVisiblePools';

import Pool from '../Pool/Pool';
import Filters from '../Filters/Filters';

const useStyles = makeStyles(styles);

const VisiblePools = ({
  pools,
  poolsInfo,
  tokens,
  stakeTokens,
  apys,
  fetchBalancesDone,
  fetchAllowancesDone,
  fetchApysDone,
  fetchVaultsDataDone,
  fromPage
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const { filteredPools, toggleFilter, filters } = useFilteredPools(pools, tokens);
  const { poolsByPlatform, platform, setPlatform } = usePoolsByPlatform(filteredPools);
  const { poolsByVaultType, vaultType, setVaultType } = usePoolsByVaultType(poolsByPlatform);
  const { poolsByAsset, asset, setAsset } = usePoolsByAsset(poolsByVaultType);
  const { sortedPools, order, setOrder } = useSortedPools(poolsByAsset, apys);
  const { visiblePools, fetchVisiblePools } = useVisiblePools(sortedPools, 10);


  // var hideNonStakable
  // if(fromPage === 'icequeen'){
  //   var
  // }




  //let stakablePools = visiblePools.filter((pool) => pool.lockForSnob === true);

  return (
    <>
      {/*       <Filters
        toggleFilter={toggleFilter}
        filters={filters}
        platform={platform}
        vaultType={vaultType}
        asset={asset}
        order={order}
        setPlatform={setPlatform}
        setVaultType={setVaultType}
        setAsset={setAsset}
        setOrder={setOrder}
      /> */}
      <div className={classes.scroller}>
        <InfiniteScroll dataLength={visiblePools.length} hasMore={true} next={fetchVisiblePools}>
          {visiblePools.map((pool, index) => (
            // if we're on icequeen page we only display stakable 'lockForSnob' pools
            (fromPage != 'icequeen'|| pool.lockForSnob == true ) ?
            <Pool
              pool={pool}
              poolsInfo={poolsInfo}
              index={index}
              tokens={tokens}
              stakeTokens={stakeTokens}
              apy={apys[pool.id] || 0}
              key={pool.id}
              fetchBalancesDone={fetchBalancesDone}
              fetchApysDone={fetchApysDone}
              fetchVaultsDataDone={fetchVaultsDataDone}
              fetchAllowancesDone={fetchAllowancesDone}
              fromPage={fromPage}
            />
            : null
          ))}
        </InfiniteScroll>
      </div>
      {!sortedPools.length && <h3 className={classes.subtitle}>{t('No-Results')}</h3>}
    </>
  );
};

export default VisiblePools;
