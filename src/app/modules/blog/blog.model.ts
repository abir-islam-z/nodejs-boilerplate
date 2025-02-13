import httpStatus from 'http-status';
import { model, Schema } from 'mongoose';
import AppError from '../../errors/AppError';
import { TBlog, TBlogModel } from './blog.interface';

export const blogSchema = new Schema<TBlog, TBlogModel>(
  {
    title: {
      type: String,
      required: [true, 'Please provide a title.'],
    },
    content: {
      type: String,
      required: [true, 'Please provide content.'],
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'A blog post must have an author.'],
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

blogSchema.pre('findOneAndUpdate', async function (next) {
  const update = this;

  const currentBlog = await update.model.findOne(update.getQuery());

  if (!currentBlog.isPublished) {
    return next(new AppError(httpStatus.NOT_FOUND, 'No blog found'));
  }

  update.setOptions({ new: true });

  next();
});

blogSchema.post('save', async function (doc, next) {
  doc = await doc.populate({ path: 'author', select: 'name email' });
  next();
});

blogSchema.pre('find', async function (next) {
  this.find({ isPublished: true }).populate({
    path: 'author',
    select: 'name email',
  });

  next();
});

export const BlogModel = model<TBlog, TBlogModel>('Blog', blogSchema);
