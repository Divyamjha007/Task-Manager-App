import { Request, Response, NextFunction } from 'express';
import Project from '../models/Project';
import { sendSuccessResponse, sendErrorResponse } from '../utils/sendResponse';

// @desc    Get all projects
// @route   GET /api/projects
// @access  Private
export const getProjects = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let query = {};
    
    // If not admin or manager, only get projects the user is a member of
    if (req.user!.role !== 'admin' && req.user!.role !== 'manager') {
      query = {
        $or: [
          { members: req.user!._id },
          { createdBy: req.user!._id }
        ]
      };
    }
    
    const projects = await Project.find(query)
      .populate('members', 'name email role avatar')
      .populate('createdBy', 'name email role avatar');
      
    sendSuccessResponse(res, 'Projects retrieved successfully', projects);
  } catch (error: any) {
    next(error);
  }
};

// @desc    Get single project
// @route   GET /api/projects/:id
// @access  Private
export const getProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate('members', 'name email role avatar')
      .populate('createdBy', 'name email role avatar');
      
    if (!project) {
      return sendErrorResponse(res, 'Project not found', 404);
    }
    
    // Make sure user has access to this project
    if (
      req.user!.role !== 'admin' &&
      req.user!.role !== 'manager' &&
      !project.members.some(member => member.toString() === req.user!._id.toString()) &&
      project.createdBy.toString() !== req.user!._id.toString()
    ) {
      return sendErrorResponse(res, 'Not authorized to access this project', 403);
    }
    
    sendSuccessResponse(res, 'Project retrieved successfully', project);
  } catch (error: any) {
    next(error);
  }
};

// @desc    Create new project
// @route   POST /api/projects
// @access  Private
export const createProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, description, status, startDate, endDate, members } = req.body;
    
    // Create project
    const project = await Project.create({
      name,
      description,
      status,
      startDate,
      endDate,
      members: members || [],
      createdBy: req.user!._id
    });
    
    const populatedProject = await Project.findById(project._id)
      .populate('members', 'name email role avatar')
      .populate('createdBy', 'name email role avatar');
      
    sendSuccessResponse(res, 'Project created successfully', populatedProject, 201);
  } catch (error: any) {
    next(error);
  }
};

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Private
export const updateProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, description, status, startDate, endDate, members } = req.body;
    
    let project = await Project.findById(req.params.id);
    
    if (!project) {
      return sendErrorResponse(res, 'Project not found', 404);
    }
    
    // Check if user is authorized to update the project
    if (
      req.user!.role !== 'admin' &&
      req.user!.role !== 'manager' &&
      project.createdBy.toString() !== req.user!._id.toString()
    ) {
      return sendErrorResponse(res, 'Not authorized to update this project', 403);
    }
    
    project = await Project.findByIdAndUpdate(
      req.params.id,
      {
        name,
        description,
        status,
        startDate,
        endDate,
        members
      },
      { new: true, runValidators: true }
    )
      .populate('members', 'name email role avatar')
      .populate('createdBy', 'name email role avatar');
      
    sendSuccessResponse(res, 'Project updated successfully', project);
  } catch (error: any) {
    next(error);
  }
};

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Private
export const deleteProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const project = await Project.findById(req.params.id);
    
    if (!project) {
      return sendErrorResponse(res, 'Project not found', 404);
    }
    
    // Check if user is authorized to delete the project
    if (
      req.user!.role !== 'admin' &&
      req.user!.role !== 'manager' &&
      project.createdBy.toString() !== req.user!._id.toString()
    ) {
      return sendErrorResponse(res, 'Not authorized to delete this project', 403);
    }
    
    await project.deleteOne();
    
    sendSuccessResponse(res, 'Project deleted successfully', null);
  } catch (error: any) {
    next(error);
  }
};

// @desc    Add member to project
// @route   PUT /api/projects/:id/members
// @access  Private
export const addProjectMember = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.body;
    
    if (!userId) {
      return sendErrorResponse(res, 'Please provide a user ID', 400);
    }
    
    const project = await Project.findById(req.params.id);
    
    if (!project) {
      return sendErrorResponse(res, 'Project not found', 404);
    }
    
    // Check if user is authorized to update the project
    if (
      req.user!.role !== 'admin' &&
      req.user!.role !== 'manager' &&
      project.createdBy.toString() !== req.user!._id.toString()
    ) {
      return sendErrorResponse(res, 'Not authorized to update this project', 403);
    }
    
    // Check if user is already a member
    if (project.members.includes(userId)) {
      return sendErrorResponse(res, 'User is already a member of this project', 400);
    }
    
    project.members.push(userId);
    await project.save();
    
    const updatedProject = await Project.findById(req.params.id)
      .populate('members', 'name email role avatar')
      .populate('createdBy', 'name email role avatar');
      
    sendSuccessResponse(res, 'Member added to project successfully', updatedProject);
  } catch (error: any) {
    next(error);
  }
};

// @desc    Remove member from project
// @route   DELETE /api/projects/:id/members/:userId
// @access  Private
export const removeProjectMember = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const project = await Project.findById(req.params.id);
    
    if (!project) {
      return sendErrorResponse(res, 'Project not found', 404);
    }
    
    // Check if user is authorized to update the project
    if (
      req.user!.role !== 'admin' &&
      req.user!.role !== 'manager' &&
      project.createdBy.toString() !== req.user!._id.toString()
    ) {
      return sendErrorResponse(res, 'Not authorized to update this project', 403);
    }
    
    // Check if user is a member
    if (!project.members.some(member => member.toString() === req.params.userId)) {
      return sendErrorResponse(res, 'User is not a member of this project', 400);
    }
    
    // Remove member
    project.members = project.members.filter(
      member => member.toString() !== req.params.userId
    );
    
    await project.save();
    
    const updatedProject = await Project.findById(req.params.id)
      .populate('members', 'name email role avatar')
      .populate('createdBy', 'name email role avatar');
      
    sendSuccessResponse(res, 'Member removed from project successfully', updatedProject);
  } catch (error: any) {
    next(error);
  }
}; 