import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';
import User, { IUser } from '../models/User';
import { sendSuccessResponse, sendErrorResponse } from '../utils/sendResponse';

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return sendErrorResponse(res, 'Email already registered', 400);
    }

    // Create the user
    const user = await User.create({
      name,
      email,
      password,
      role: role || 'employee', // Default to employee if no role provided
    });

    // Send token response
    sendTokenResponse(user, 201, res);
  } catch (error: any) {
    next(error);
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    // Validate email and password
    if (!email || !password) {
      return sendErrorResponse(res, 'Please provide email and password', 400);
    }

    // Check for user
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return sendErrorResponse(res, 'Invalid credentials', 401);
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return sendErrorResponse(res, 'Invalid credentials', 401);
    }

    // Send token response
    sendTokenResponse(user, 200, res);
  } catch (error: any) {
    next(error);
  }
};

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // User is already available in req due to the protect middleware
    const user = req.user!;
    sendSuccessResponse(res, 'Current user retrieved', user);
  } catch (error: any) {
    next(error);
  }
};

// @desc    Update user details
// @route   PUT /api/auth/updatedetails
// @access  Private
export const updateDetails = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email } = req.body;
    const userId = req.user!._id;

    // Check if email is already taken by another user
    if (email) {
      const emailExists = await User.findOne({ email, _id: { $ne: userId } });
      if (emailExists) {
        return sendErrorResponse(res, 'Email already in use', 400);
      }
    }

    // Update user
    const user = await User.findByIdAndUpdate(
      userId,
      { name, email },
      { new: true, runValidators: true }
    );

    sendSuccessResponse(res, 'User details updated', user);
  } catch (error: any) {
    next(error);
  }
};

// @desc    Update password
// @route   PUT /api/auth/updatepassword
// @access  Private
export const updatePassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user!._id;

    // Check if current password and new password are provided
    if (!currentPassword || !newPassword) {
      return sendErrorResponse(res, 'Please provide current password and new password', 400);
    }

    // Get user with password
    const user = await User.findById(userId).select('+password');
    if (!user) {
      return sendErrorResponse(res, 'User not found', 404);
    }

    // Check if current password matches
    const isMatch = await user.matchPassword(currentPassword);
    if (!isMatch) {
      return sendErrorResponse(res, 'Current password is incorrect', 401);
    }

    // Update password
    user.password = newPassword;
    await user.save();

    sendSuccessResponse(res, 'Password updated', null);
  } catch (error: any) {
    next(error);
  }
};

// @desc    Forgot password
// @route   POST /api/auth/forgotpassword
// @access  Public
export const forgotPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.body;

    // Check if email is provided
    if (!email) {
      return sendErrorResponse(res, 'Please provide an email', 400);
    }

    // Find user with this email
    const user = await User.findOne({ email });
    if (!user) {
      return sendErrorResponse(res, 'No user found with that email', 404);
    }

    // Get reset token
    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });

    // In a real application, you would send an email with the reset URL
    // For now, we'll just return the token in the response
    const resetUrl = `${req.protocol}://${req.get('host')}/api/auth/resetpassword/${resetToken}`;

    sendSuccessResponse(
      res,
      'Password reset email sent',
      { resetUrl, resetToken },
      200
    );
  } catch (error: any) {
    next(error);
  }
};

// @desc    Reset password
// @route   PUT /api/auth/resetpassword/:resettoken
// @access  Public
export const resetPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { password } = req.body;
    const resetToken = req.params.resettoken;

    // Hash the reset token
    const resetPasswordToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    // Find user with this reset token and check if it's still valid
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return sendErrorResponse(res, 'Invalid or expired token', 400);
    }

    // Set new password
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    // Send token response
    sendTokenResponse(user, 200, res);
  } catch (error: any) {
    next(error);
  }
};

// @desc    Log user out / clear cookie
// @route   GET /api/auth/logout
// @access  Private
export const logout = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000), // Expire in 10 seconds
    httpOnly: true,
  });

  return sendSuccessResponse(res, 'User logged out successfully', null);
};

// Get token from model, create cookie and send response
const sendTokenResponse = (user: IUser, statusCode: number, res: Response) => {
  // Create token
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + parseInt(process.env.JWT_COOKIE_EXPIRE!) * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  };

  // Create user object without password
  const userData = {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    avatar: user.avatar,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };

  res
    .status(statusCode)
    .cookie('token', token, options)
    .json({
      success: true,
      token,
      user: userData,
    });
}; 