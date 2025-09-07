import { AdminRoutes } from '@modules/admin/admin.route';
import { AuthRoutes } from '@modules/auth/auth.route';
import { MailRoutes } from '@modules/mail/mail.route';
import { OrderRoutes } from '@modules/order/order.route';
import { Router } from 'express';

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
  {
    path: '/mail',
    route: MailRoutes,
  },
  { path: '/order', route: OrderRoutes },
];

moduleRoutes.forEach(route => {
  router.use(route.path, route.route);
});

export default router;
