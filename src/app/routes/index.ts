import { Router } from 'express';
import { AdminRoutes } from '#app/modules/admin/admin.route';
import { AuthRoutes } from '#app/modules/auth/auth.route';
import { OrderRoutes } from '#app/modules/order/order.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/admin',
    route: AdminRoutes,
  },
  { path: '/order', route: OrderRoutes },
];

moduleRoutes.forEach(route => {
  router.use(route.path, route.route);
});

export default router;
