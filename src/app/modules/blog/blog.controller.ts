import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { BlogService } from './blog.service';

const createBlog = catchAsync(async (req: Request, res: Response) => {
  const authorData = req.user;
  const { title, content } = req.body;

  const createdBlog = await BlogService.createBlogPost(
    {
      title,
      content,
    },
    authorData.userId,
  );

  sendResponse(res, {
    success: true,
    message: 'Blog created successfully',
    statusCode: 201,
    data: createdBlog,
  });
});

const updateBlog = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const blogId = req.params.id;
  const authorData = req.user;

  const updatedBlog = await BlogService.updateBlogPost(
    blogId,
    data,
    authorData.userId,
  );
  sendResponse(res, {
    success: true,
    message: 'Blog updated successfully',
    statusCode: 200,
    data: updatedBlog,
  });
});

const deleteBlog = catchAsync(async (req: Request, res: Response) => {
  const blogId = req.params.id;
  const authorData = req.user;

  await BlogService.deleteBlogPost(blogId, authorData.userId);
  sendResponse(res, {
    success: true,
    message: 'Blog deleted successfully',
    statusCode: 200,
  });
});

const getAllBlogs = catchAsync(async (req: Request, res: Response) => {
  const searchQuery = req.query;
  const blogs = await BlogService.getAllBlogs(searchQuery);

  sendResponse(res, {
    success: true,
    message: 'Blogs fetched successfully',
    statusCode: 200,
    data: blogs,
  });
});

export const BlogController = {
  createBlog,
  updateBlog,
  deleteBlog,
  getAllBlogs,
};
