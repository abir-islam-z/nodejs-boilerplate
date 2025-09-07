import config from '@app/config';
import AppError from '@app/errors/AppError';
import { mailService } from '@app/services/mail.service';
import { templateService } from '@app/services/template.service';
import { UserModel } from '@modules/user/user.model';
import httpStatus from 'http-status';
import { TLoginUser } from './auth.interface';
import { createToken, verifyToken } from './auth.utils';
import { TRegister } from './auth.validation';

const registerUser = async (payload: TRegister) => {
  const user = await UserModel.create(payload);

  // Send welcome email
  try {
    const emailHtml = templateService.renderEmail('welcome', {
      name: user.name,
    });

    await mailService.sendMail({
      to: user.email,
      subject: 'Welcome to Our App!',
      html: emailHtml,
    });
  } catch (error) {
    // Log error but don't fail registration
    console.error('Failed to send welcome email:', error);
  }

  return user;
};

const loginUser = async (
  payload: TLoginUser,
): Promise<{
  accessToken: string;
  refreshToken: string;
}> => {
  const user = await UserModel.isUserExistsByEmail(payload.email);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }

  const isBlocked = user.isBlocked;

  if (isBlocked) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      'Your account has been deactivated.Please contact support !',
    );
  }

  const isPasswordMatched = await UserModel.isPasswordMatched(
    payload.password,
    user.password,
  );

  if (!isPasswordMatched) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid Credentials');
  }

  const jwtPayload = {
    userId: user._id as unknown as string,
    role: user.role as string,
    name: user.name as string,
    email: user.email as string,
  };

  const accessToken = createToken({
    jwtPayload,
    secret: config.jwt.access_secret as string,
    expiresIn: config.jwt.access_expires_in as string,
  });

  const refreshToken = createToken({
    jwtPayload,
    secret: config.jwt.refresh_secret as string,
    expiresIn: config.jwt.refresh_expires_in as string,
  });

  return {
    accessToken,
    refreshToken,
  };
};

const changePassword = async (payload: {
  userId: string;
  oldPassword: string;
  newPassword: string;
}): Promise<void> => {
  const user = await UserModel.findById(payload.userId)
    .select('+password')
    .exec();

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  const isPasswordMatched = await UserModel.isPasswordMatched(
    payload.oldPassword,
    user.password,
  );

  if (!isPasswordMatched) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid Credentials');
  }

  user.password = payload.newPassword;
  user.passwordChangedAt = new Date();
  await user.save();

  return;
};

const refreshToken = async (token: string) => {
  // checking if the given token is valid
  const decoded = verifyToken(token, config.jwt.refresh_secret as string);

  const { email, iat } = decoded;

  // checking if the user exists
  const user = await UserModel.isUserExistsByEmail(email);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }
  // checking if the user is already deleted
  const isBlocked = user?.isBlocked;

  if (isBlocked) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
  }

  if (
    user.passwordChangedAt &&
    UserModel.isJWTIssuedBeforePasswordChanged(
      user.passwordChangedAt,
      iat as number,
    )
  ) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized !');
  }

  const jwtPayload = {
    userId: user._id as unknown as string,
    role: user.role,
    name: user.name,
    email: user.email,
  };

  const accessToken = createToken({
    jwtPayload,
    secret: config.jwt.access_secret as string,
    expiresIn: config.jwt.access_expires_in as string,
  });

  return {
    accessToken,
  };
};

const requestPasswordReset = async (email: string): Promise<void> => {
  const user = await UserModel.isUserExistsByEmail(email);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  // Generate reset token (you might want to store this in database with expiry)
  const resetToken = createToken({
    jwtPayload: { userId: String(user._id), role: user.role },
    secret: config.jwt.access_secret as string,
    expiresIn: '1h',
  });

  try {
    const emailHtml = templateService.renderEmail('password-reset', {
      name: user.name,
      resetUrl: `${config.frontend_url || 'http://localhost:3000'}/reset-password?token=${resetToken}`,
    });

    await mailService.sendMail({
      to: user.email,
      subject: 'Password Reset Request',
      html: emailHtml,
    });
  } catch (error) {
    console.error('Failed to send password reset email:', error);
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Failed to send reset email',
    );
  }
};

export const AuthService = {
  registerUser,
  loginUser,
  changePassword,
  refreshToken,
  requestPasswordReset,
};
