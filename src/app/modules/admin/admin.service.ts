import { UserModel } from '#app/modules/user/user.model';

const blockUserFromDB = async (userId: string) => {
  await UserModel.findByIdAndUpdate(
    { _id: userId },
    { isBlocked: true },
    { new: true }
  );
};

export const AdminService = {
  blockUserFromDB,
};
