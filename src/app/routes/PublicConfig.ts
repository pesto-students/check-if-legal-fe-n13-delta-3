import AuthLayout from '../components/Auth';
import { HomePage } from '../pages/HomePage/Loadable';
import { NotFoundPage } from '../components/NotFoundPage/Loadable';
const routes = [
  {
    path: '/',
    component: HomePage,
  },
  {
    path: '/login',
    component: AuthLayout,
  },
  {
    path: '*',
    component: NotFoundPage,
  },
];

export default routes;
