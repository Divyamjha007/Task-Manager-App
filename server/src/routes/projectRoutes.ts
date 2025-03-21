import express, { RequestHandler } from 'express';
import {
  createProject,
  getProjects,
  getProject,
  updateProject,
  deleteProject,
  addProjectMember,
  removeProjectMember
} from '../controllers/projectController';
import { protect, authorize } from '../middleware/auth';
import { validateRequest } from '../middleware/validateRequest';
import { projectValidation } from '../utils/validators';
import { asyncHandler, asMiddleware } from '../utils/routeHandler';

const router = express.Router();

// Apply protection to all routes
router.use(asMiddleware(protect));

// Project routes
router.route('/')
  .post(projectValidation, asMiddleware(validateRequest), asyncHandler(createProject))
  .get(asyncHandler(getProjects));

router.route('/:id')
  .get(asyncHandler(getProject))
  .put(projectValidation, asMiddleware(validateRequest), asyncHandler(updateProject))
  .delete(asyncHandler(deleteProject));

// Member management
router.route('/:id/members')
  .post(asyncHandler(addProjectMember))
  .delete(asyncHandler(removeProjectMember));

export default router; 