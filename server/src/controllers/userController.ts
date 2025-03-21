import { Request, Response, NextFunction } from 'express';
import User from '../models/User';
import { sendSuccessResponse, sendErrorResponse } from '../utils/sendResponse';

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await User.find();
    sendSuccessResponse(res, 'Users retrieved successfully', users);
  } catch (error: any) {
    next(error);
  }
};

// @desc    Get single user
// @route   GET /api/users/:id
// @access  Private/Admin
export const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return sendErrorResponse(res, 'User not found', 404);
    }
    
    sendSuccessResponse(res, 'User retrieved successfully', user);
  } catch (error: any) {
    next(error);
  }
};

// @desc    Create user
// @route   POST /api/users
// @access  Private/Admin
export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, password, role } = req.body;
    
    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return sendErrorResponse(res, 'Email already in use', 400);
    }
    
    const user = await User.create({
      name,
      email,
      password,
      role,
    });
    
    sendSuccessResponse(res, 'User created successfully', user, 201);
  } catch (error: any) {
    next(error);
  }
};

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, role } = req.body;
    const userId = req.params.id;
    
    // Check if email already exists (but not for this user)
    if (email) {
      const existingUser = await User.findOne({ email, _id: { $ne: userId } });
      if (existingUser) {
        return sendErrorResponse(res, 'Email already in use', 400);
      }
    }
    
    let user = await User.findById(userId);
    
    if (!user) {
      return sendErrorResponse(res, 'User not found', 404);
    }
    
    user = await User.findByIdAndUpdate(
      userId,
      { name, email, role },
      { new: true, runValidators: true }
    );
    
    sendSuccessResponse(res, 'User updated successfully', user);
  } catch (error: any) {
    next(error);
  }
};

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return sendErrorResponse(res, 'User not found', 404);
    }
    
    // Make sure user is not deleting themselves
    if (user._id.toString() === req.user!._id.toString()) {
      return sendErrorResponse(res, 'You cannot delete your own account', 400);
    }
    
    await user.deleteOne();
    
    sendSuccessResponse(res, 'User deleted successfully', null);
  } catch (error: any) {
    next(error);
  }
};

// @desc    Upload user avatar
// @route   PUT /api/users/:id/avatar
// @access  Private/Admin
export const uploadAvatar = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return sendErrorResponse(res, 'User not found', 404);
    }
    
    // In a real app, you would process the uploaded file and save the URL
    // For now, we'll just use a generated avatar
    const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random`;
    
    user.avatar = avatarUrl;
    await user.save();
    
    sendSuccessResponse(res, 'Avatar uploaded successfully', { avatar: user.avatar });
  } catch (error: any) {
    next(error);
  }
}; 