import express, { RequestHandler } from 'express';
import {
  register,
  login,
  getMe,
  updateDetails,
  updatePassword,
  forgotPassword,
  resetPassword,
  logout
} from '../controllers/authController';
import { protect } from '../middleware/auth';
import { validateRequest } from '../middleware/validateRequest';
import {
  registerValidation,
  loginValidation,
  updateDetailsValidation,
  updatePasswordValidation,
  forgotPasswordValidation,
  resetPasswordValidation
} from '../utils/validators';
import { asyncHandler, asMiddleware } from '../utils/routeHandler';

const router = express.Router();

// Public routes
router.post('/register', registerValidation, asMiddleware(validateRequest), asyncHandler(register));
router.post('/login', loginValidation, asMiddleware(validateRequest), asyncHandler(login));
router.post('/forgotpassword', forgotPasswordValidation, asMiddleware(validateRequest), asyncHandler(forgotPassword));
router.put('/resetpassword/:resettoken', resetPasswordValidation, asMiddleware(validateRequest), asyncHandler(resetPassword));
router.get('/logout', asyncHandler(logout));

// Protected routes
router.use(asMiddleware(protect));
router.get('/me', asyncHandler(getMe));
router.put('/updatedetails', updateDetailsValidation, asMiddleware(validateRequest), asyncHandler(updateDetails));
router.put('/updatepassword', updatePasswordValidation, asMiddleware(validateRequest), asyncHandler(updatePassword));

export default router; 