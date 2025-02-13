import { Model, Types } from 'mongoose';

export interface TBlog {
  title: string;
  content: string;
  author: Types.ObjectId;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface TBlogModel extends Model<TBlog> {
  isAuthor(blogId: string, authorId: string): Promise<boolean>;
}

export interface TBlogPost {
  title: string;
  content: string;
}
