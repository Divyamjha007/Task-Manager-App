import { check, ValidationChain } from 'express-validator';

// User validation rules
export const registerValidation: ValidationChain[] = [
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
];

export const loginValidation: ValidationChain[] = [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists(),
];

export const updateDetailsValidation: ValidationChain[] = [
  check('name', 'Name is required').optional().not().isEmpty(),
  check('email', 'Please include a valid email').optional().isEmail(),
];

export const updatePasswordValidation: ValidationChain[] = [
  check('currentPassword', 'Current password is required').not().isEmpty(),
  check('newPassword', 'New password must be at least 6 characters').isLength({ min: 6 }),
];

export const forgotPasswordValidation: ValidationChain[] = [
  check('email', 'Please include a valid email').isEmail(),
];

export const resetPasswordValidation: ValidationChain[] = [
  check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
];

// Project validation rules
export const projectValidation: ValidationChain[] = [
  check('name', 'Project name is required').not().isEmpty(),
  check('description', 'Description is required').not().isEmpty(),
  check('status', 'Status must be one of: active, completed, archived')
    .optional()
    .isIn(['active', 'completed', 'archived']),
  check('startDate', 'Start date must be a valid date')
    .optional()
    .isISO8601(),
  check('endDate', 'End date must be a valid date')
    .optional()
    .isISO8601(),
  check('members', 'Members must be an array')
    .optional()
    .isArray(),
];

// Task validation rules
export const taskValidation: ValidationChain[] = [
  check('title', 'Title is required').not().isEmpty(),
  check('description', 'Description is required').not().isEmpty(),
  check('status', 'Status must be one of: pending, in-progress, completed')
    .optional()
    .isIn(['pending', 'in-progress', 'completed']),
  check('priority', 'Priority must be one of: low, medium, high')
    .optional()
    .isIn(['low', 'medium', 'high']),
  check('dueDate', 'Due date must be a valid date')
    .optional()
    .isISO8601(),
]; 