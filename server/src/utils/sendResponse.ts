import { Response } from 'express';

/**
 * Send success response
 * @param res - Express response object
 * @param message - Message to send
 * @param data - Data to send
 * @param statusCode - HTTP status code (default: 200)
 */
export const sendSuccessResponse = (
  res: Response,
  message: string,
  data: any = null,
  statusCode: number = 200
) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

/**
 * Send error response
 * @param res - Express response object
 * @param message - Error message
 * @param statusCode - HTTP status code (default: 400)
 */
export const sendErrorResponse = (
  res: Response,
  message: string,
  statusCode: number = 400
) => {
  return res.status(statusCode).json({
    success: false,
    error: message,
  });
}; 