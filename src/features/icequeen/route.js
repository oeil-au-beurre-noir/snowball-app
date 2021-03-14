import { IcequeenPage, PoolPage } from './';

export default {
  path: 'icequeen',
  childRoutes: [
    { path: 'icequeen', component: IcequeenPage, isIndex: true },
    { path: 'pool/:index', component: PoolPage },
  ],
};