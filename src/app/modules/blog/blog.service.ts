import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { BlogSearchableFields } from './blog.constant';
import { TBlogPost } from './blog.interface';
import { BlogModel } from './blog.model';

const createBlogPost = async (payload: TBlogPost, author: string) => {
  const newBlog = await BlogModel.create({
    ...payload,
    author,
  });
  return newBlog;
};

const updateBlogPost = async (
  blogId: string,
  payload: Partial<TBlogPost>,
  author: string,
) => {
  const blog = await BlogModel.findOne({
    _id: blogId,
    author,
  });

  if (!blog) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      'you are not authorized to update',
    );
  }
  const updatedBlog = await BlogModel.findByIdAndUpdate(blogId, payload, {
    new: true,
    populate: { path: 'author', select: 'name email' },
  });

  return updatedBlog;
};

const deleteBlogPost = async (blogId: string, author: string) => {
  await BlogModel.findOneAndUpdate(
    {
      _id: blogId,
      author,
      isPublished: true,
    },
    { isPublished: false },
  );
};

const getAllBlogs = async (query: Record<string, unknown>) => {
  const blogQuery = new QueryBuilder(BlogModel.find(), query)
    .search(BlogSearchableFields)
    .sort()
    .filter();

  const result = await blogQuery.modelQuery;

  return result;
};

export const BlogService = {
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
  getAllBlogs,
};
