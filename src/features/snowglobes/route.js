import { StakePage, PoolPage } from './';
import SnowglobesPage from './SnowglobesPage';

export default {
  path: 'stake',
  childRoutes: [
    { path: 'snowglobes', component: SnowglobesPage, isIndex: true },
    { path: 'pool/:index', component: PoolPage },
  ],
};