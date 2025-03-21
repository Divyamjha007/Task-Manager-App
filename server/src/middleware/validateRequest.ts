import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

/**
 * Middleware to validate requests using express-validator
 * This runs after validation rules have been applied
 */
export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array().map(err => ({
        field: 'path' in err ? err.path : 'param' in err ? err.param : '',
        message: err.msg
      }))
    });
  }
  next();
}; 