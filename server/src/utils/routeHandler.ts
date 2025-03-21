import { Request, Response, NextFunction, RequestHandler } from 'express';

/**
 * Async handler for Express route controllers
 * @param fn Function to execute
 * @returns Request handler function
 */
export const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

/**
 * Convert a function to middleware
 * @param fn Function to convert
 * @returns Middleware function
 */
export const asMiddleware = (fn: any): RequestHandler => {
  return fn as RequestHandler;
}; 