import { SnowglobesPage } from './';

export default {
  path: 'snowglobes',
  childRoutes: [
    { path: 'snowglobes', component: SnowglobesPage, isIndex: true },
    // { path: 'pool/:index', component: PoolPage },
  ],
};