import { Request, Response, NextFunction } from 'express';
import Task from '../models/Task';
import Project from '../models/Project';
import { sendSuccessResponse, sendErrorResponse } from '../utils/sendResponse';

// @desc    Get all tasks
// @route   GET /api/tasks
// @access  Private
export const getTasks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let query: any = {};
    
    // Filter tasks by project if provided
    if (req.query.project) {
      query.project = req.query.project;
    }
    
    // Filter tasks by status if provided
    if (req.query.status) {
      query.status = req.query.status;
    }
    
    // Filter tasks by priority if provided
    if (req.query.priority) {
      query.priority = req.query.priority;
    }
    
    // For regular users, only show tasks they created or are assigned to
    if (req.user!.role !== 'admin' && req.user!.role !== 'manager') {
      query = {
        ...query,
        $or: [
          { assignedTo: req.user!._id },
          { createdBy: req.user!._id }
        ]
      };
    }
    
    const tasks = await Task.find(query)
      .populate({
        path: 'project',
        select: 'name status',
      })
      .populate({
        path: 'assignedTo',
        select: 'name email avatar',
      })
      .populate({
        path: 'createdBy',
        select: 'name email avatar',
      });
      
    sendSuccessResponse(res, 'Tasks retrieved successfully', tasks);
  } catch (error: any) {
    next(error);
  }
};

// @desc    Get single task
// @route   GET /api/tasks/:id
// @access  Private
export const getTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const task = await Task.findById(req.params.id)
      .populate({
        path: 'project',
        select: 'name status',
      })
      .populate({
        path: 'assignedTo',
        select: 'name email avatar',
      })
      .populate({
        path: 'createdBy',
        select: 'name email avatar',
      });
      
    if (!task) {
      return sendErrorResponse(res, 'Task not found', 404);
    }
    
    // Check if user has access to this task
    const isAdmin = req.user!.role === 'admin';
    const isManager = req.user!.role === 'manager';
    const isCreator = task.createdBy._id.toString() === req.user!._id.toString();
    const isAssigned = task.assignedTo && task.assignedTo._id.toString() === req.user!._id.toString();
    
    if (!isAdmin && !isManager && !isCreator && !isAssigned) {
      // Check if user is a member of the project
      if (task.project) {
        const project = await Project.findById(task.project);
        const isProjectMember = project && project.members.some(member => member.toString() === req.user!._id.toString());
        
        if (!isProjectMember) {
          return sendErrorResponse(res, 'Not authorized to access this task', 403);
        }
      } else {
        return sendErrorResponse(res, 'Not authorized to access this task', 403);
      }
    }
    
    sendSuccessResponse(res, 'Task retrieved successfully', task);
  } catch (error: any) {
    next(error);
  }
};

// @desc    Create new task
// @route   POST /api/tasks
// @access  Private
export const createTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, description, status, priority, dueDate, assignedTo, project } = req.body;
    
    // Check if project exists if project ID is provided
    if (project) {
      const projectExists = await Project.findById(project);
      
      if (!projectExists) {
        return sendErrorResponse(res, 'Project not found', 404);
      }
      
      // Check if user has access to this project
      const isAdmin = req.user!.role === 'admin';
      const isManager = req.user!.role === 'manager';
      const isCreator = projectExists.createdBy.toString() === req.user!._id.toString();
      const isMember = projectExists.members.some(member => member.toString() === req.user!._id.toString());
      
      if (!isAdmin && !isManager && !isCreator && !isMember) {
        return sendErrorResponse(res, 'Not authorized to create tasks for this project', 403);
      }
    }
    
    // Create the task
    const task = await Task.create({
      title,
      description,
      status,
      priority,
      dueDate,
      assignedTo,
      project,
      createdBy: req.user!._id
    });
    
    const populatedTask = await Task.findById(task._id)
      .populate({
        path: 'project',
        select: 'name status',
      })
      .populate({
        path: 'assignedTo',
        select: 'name email avatar',
      })
      .populate({
        path: 'createdBy',
        select: 'name email avatar',
      });
      
    sendSuccessResponse(res, 'Task created successfully', populatedTask, 201);
  } catch (error: any) {
    next(error);
  }
};

// @desc    Update task
// @route   PUT /api/tasks/:id
// @access  Private
export const updateTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, description, status, priority, dueDate, assignedTo, project } = req.body;
    
    let task = await Task.findById(req.params.id);
    
    if (!task) {
      return sendErrorResponse(res, 'Task not found', 404);
    }
    
    // Check if user has permission to update the task
    const isAdmin = req.user!.role === 'admin';
    const isManager = req.user!.role === 'manager';
    const isCreator = task.createdBy.toString() === req.user!._id.toString();
    const isAssigned = task.assignedTo && task.assignedTo.toString() === req.user!._id.toString();
    
    if (!isAdmin && !isManager && !isCreator && !isAssigned) {
      return sendErrorResponse(res, 'Not authorized to update this task', 403);
    }
    
    // If project is being changed, check if user has access to new project
    if (project && (!task.project || task.project.toString() !== project)) {
      const projectExists = await Project.findById(project);
      
      if (!projectExists) {
        return sendErrorResponse(res, 'Project not found', 404);
      }
      
      const isProjectCreator = projectExists.createdBy.toString() === req.user!._id.toString();
      const isProjectMember = projectExists.members.some(member => member.toString() === req.user!._id.toString());
      
      if (!isAdmin && !isManager && !isProjectCreator && !isProjectMember) {
        return sendErrorResponse(res, 'Not authorized to assign tasks to this project', 403);
      }
    }
    
    // Update the task
    task = await Task.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        status,
        priority,
        dueDate,
        assignedTo,
        project
      },
      { new: true, runValidators: true }
    )
      .populate({
        path: 'project',
        select: 'name status',
      })
      .populate({
        path: 'assignedTo',
        select: 'name email avatar',
      })
      .populate({
        path: 'createdBy',
        select: 'name email avatar',
      });
      
    sendSuccessResponse(res, 'Task updated successfully', task);
  } catch (error: any) {
    next(error);
  }
};

// @desc    Delete task
// @route   DELETE /api/tasks/:id
// @access  Private
export const deleteTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const task = await Task.findById(req.params.id);
    
    if (!task) {
      return sendErrorResponse(res, 'Task not found', 404);
    }
    
    // Check if user has permission to delete the task
    const isAdmin = req.user!.role === 'admin';
    const isManager = req.user!.role === 'manager';
    const isCreator = task.createdBy.toString() === req.user!._id.toString();
    
    if (!isAdmin && !isManager && !isCreator) {
      return sendErrorResponse(res, 'Not authorized to delete this task', 403);
    }
    
    await task.deleteOne();
    
    sendSuccessResponse(res, 'Task deleted successfully', null);
  } catch (error: any) {
    next(error);
  }
}; 