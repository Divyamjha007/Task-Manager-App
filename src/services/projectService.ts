import axios from 'axios';
import { Project } from '../store/slices/projectSlice';

const API_URL = '/api/projects';

// Get token from local storage
const getToken = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  return user.token;
};

// Create axios instance with auth header
const axiosInstance = () => {
  const token = getToken();
  return axios.create({
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Get all projects
const getProjects = async (): Promise<Project[]> => {
  const response = await axiosInstance().get(API_URL);
  return response.data;
};

// Get project by ID
const getProjectById = async (id: string): Promise<Project> => {
  const response = await axiosInstance().get(`${API_URL}/${id}`);
  return response.data;
};

// Create new project
const createProject = async (projectData: Partial<Project>): Promise<Project> => {
  const response = await axiosInstance().post(API_URL, projectData);
  return response.data;
};

// Update project
const updateProject = async (id: string, projectData: Partial<Project>): Promise<Project> => {
  const response = await axiosInstance().put(`${API_URL}/${id}`, projectData);
  return response.data;
};

// Delete project
const deleteProject = async (id: string): Promise<void> => {
  await axiosInstance().delete(`${API_URL}/${id}`);
};

const projectService = {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
};

export default projectService; 