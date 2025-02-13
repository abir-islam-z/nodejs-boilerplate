import { BlogModel } from '../blog/blog.model';
import { UserModel } from '../user/user.model';

const blockUserFromDB = async (userId: string) => {
  await UserModel.findByIdAndUpdate(
    { _id: userId },
    { isBlocked: true },
    { new: true },
  );
};

const deleteBlogFromDB = async (blogId: string) => {
  await BlogModel.findByIdAndUpdate(blogId, { isPublished: false });
};

export const AdminService = {
  blockUserFromDB,
  deleteBlogFromDB,
};
