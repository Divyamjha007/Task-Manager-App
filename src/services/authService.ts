import axios from 'axios';
import { User } from '../store/slices/authSlice';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Register user
const register = async (userData: { name: string; email: string; password: string }) => {
  const response = await axios.post(`${API_URL}/auth/register`, userData);

  if (response.data) {
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
  }

  return response.data;
};

// Login user
const login = async (userData: { email: string; password: string }) => {
  const response = await axios.post(`${API_URL}/auth/login`, userData);

  if (response.data) {
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
  }

  return response.data;
};

// Logout user
const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

// Get current user
const getCurrentUser = async () => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    throw new Error('No token found');
  }

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${API_URL}/auth/me`, config);
  return response.data;
};

// Forgot password
const forgotPassword = async (email: string) => {
  const response = await axios.post(`${API_URL}/auth/forgotpassword`, { email });
  return response.data;
};

// Reset password
const resetPassword = async (token: string, password: string) => {
  const response = await axios.put(`${API_URL}/auth/resetpassword/${token}`, {
    password,
  });
  return response.data;
};

// Update password
const updatePassword = async (passwordData: { currentPassword: string; newPassword: string }) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    throw new Error('No token found');
  }

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(
    `${API_URL}/auth/updatepassword`,
    passwordData,
    config
  );
  return response.data;
};

// Update profile
const updateProfile = async (profileData: Partial<User>) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    throw new Error('No token found');
  }

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(
    `${API_URL}/users/profile`,
    profileData,
    config
  );

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};

// Upload avatar
const uploadAvatar = async (formData: FormData) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    throw new Error('No token found');
  }

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  };

  const response = await axios.post(
    `${API_URL}/users/avatar`,
    formData,
    config
  );

  if (response.data) {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    user.avatar = response.data.avatar;
    localStorage.setItem('user', JSON.stringify(user));
  }

  return response.data;
};

const authService = {
  register,
  login,
  logout,
  getCurrentUser,
  forgotPassword,
  resetPassword,
  updatePassword,
  updateProfile,
  uploadAvatar,
};

export default authService; 