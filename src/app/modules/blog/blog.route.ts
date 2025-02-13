import { Router } from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { BlogController } from './blog.controller';
import { BlogValidation } from './blog.validation';

const router = Router();

router.post(
  '/',
  auth('user'),
  validateRequest(BlogValidation.createBlogValidationSchema),
  BlogController.createBlog,
);

router.patch(
  '/:id',
  auth('user'),
  validateRequest(BlogValidation.updateBlogValidationSchema),
  BlogController.updateBlog,
);

router.delete('/:id', auth('user'), BlogController.deleteBlog);

router.get('/', BlogController.getAllBlogs);

export const BlogRoutes = router;
