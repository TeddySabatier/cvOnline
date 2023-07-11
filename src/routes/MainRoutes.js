import { lazy } from 'react';
import Loadable from 'ui-component/Loadable';

const CV = Loadable(lazy(() => import('views/cv')));

const MainRoutes = {
  path: '/cvOnline',
  element: <CV />,
};

export default MainRoutes;
