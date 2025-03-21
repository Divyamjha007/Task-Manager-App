import express from 'express';
import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  uploadAvatar
} from '../controllers/userController';
import { protect, authorize } from '../middleware/auth';
import { asyncHandler, asMiddleware } from '../utils/routeHandler';

const router = express.Router();

// Apply protection to all routes
router.use(asMiddleware(protect));
// Admin only routes
router.use(asMiddleware(authorize('admin')));

router.route('/')
  .get(asyncHandler(getUsers))
  .post(asyncHandler(createUser));

router.route('/:id')
  .get(asyncHandler(getUser))
  .put(asyncHandler(updateUser))
  .delete(asyncHandler(deleteUser));

router.route('/:id/avatar')
  .put(asyncHandler(uploadAvatar));

export default router; 