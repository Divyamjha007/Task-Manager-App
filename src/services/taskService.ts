import axios from 'axios';
import { Task } from '../store/slices/taskSlice';

const API_URL = '/api/tasks';

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

// Get all tasks
const getTasks = async (): Promise<Task[]> => {
  const response = await axiosInstance().get(API_URL);
  return response.data;
};

// Get task by ID
const getTaskById = async (id: string): Promise<Task> => {
  const response = await axiosInstance().get(`${API_URL}/${id}`);
  return response.data;
};

// Create new task
const createTask = async (taskData: Partial<Task>): Promise<Task> => {
  const response = await axiosInstance().post(API_URL, taskData);
  return response.data;
};

// Update task
const updateTask = async (id: string, taskData: Partial<Task>): Promise<Task> => {
  const response = await axiosInstance().put(`${API_URL}/${id}`, taskData);
  return response.data;
};

// Delete task
const deleteTask = async (id: string): Promise<void> => {
  await axiosInstance().delete(`${API_URL}/${id}`);
};

const taskService = {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};

export default taskService; 