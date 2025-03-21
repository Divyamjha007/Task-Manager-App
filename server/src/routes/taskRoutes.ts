import express from 'express';
import {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask
} from '../controllers/taskController';
import { protect } from '../middleware/auth';
import { validateRequest } from '../middleware/validateRequest';
import { taskValidation } from '../utils/validators';
import { asyncHandler, asMiddleware } from '../utils/routeHandler';

const router = express.Router();

// Apply protection to all routes
router.use(asMiddleware(protect));

// Task routes
router.route('/')
  .get(asyncHandler(getTasks))
  .post(taskValidation, asMiddleware(validateRequest), asyncHandler(createTask));

router.route('/:id')
  .get(asyncHandler(getTask))
  .put(taskValidation, asMiddleware(validateRequest), asyncHandler(updateTask))
  .delete(asyncHandler(deleteTask));

export default router; 