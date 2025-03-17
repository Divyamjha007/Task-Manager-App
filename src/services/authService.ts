import { User } from '../store/slices/authSlice';
import { dummyUsers, DummyUser } from '../data/dummyUsers';

// Simulating API delays
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

class AuthServiceClass {
  private users: DummyUser[] = [...dummyUsers];

  async login({ email, password }: LoginCredentials) {
    await delay(1000); // Simulate API call

    const user = this.users.find(u => u.email === email && u.password === password);
    if (!user) {
      throw new Error('Invalid email or password');
    }

    // Don't send password to frontend
    const { password: _, ...userWithoutPassword } = user;
    
    // Store in localStorage
    localStorage.setItem('user', JSON.stringify(userWithoutPassword));
    localStorage.setItem('token', 'dummy-token');
    
    return userWithoutPassword;
  }

  async register({ name, email, password }: RegisterData) {
    await delay(1000); // Simulate API call

    if (this.users.some(u => u.email === email)) {
      throw new Error('Email already registered');
    }

    const newUser: DummyUser = {
      id: (this.users.length + 1).toString(),
      name,
      email,
      password,
      role: 'employee',
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.users.push(newUser);

    // Don't send password to frontend
    const { password: _, ...userWithoutPassword } = newUser;
    
    // Store in localStorage
    localStorage.setItem('user', JSON.stringify(userWithoutPassword));
    localStorage.setItem('token', 'dummy-token');
    
    return userWithoutPassword;
  }

  async forgotPassword(email: string) {
    await delay(1000); // Simulate API call

    const user = this.users.find(u => u.email === email);
    if (!user) {
      throw new Error('Email not found');
    }

    // Generate reset token
    const resetToken = Math.random().toString(36).substring(2, 15);
    const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour

    // Update user with reset token
    user.resetToken = resetToken;
    user.resetTokenExpiry = resetTokenExpiry;

    // In a real app, this would send an email
    console.log(`Reset token for ${email}: ${resetToken}`);
    
    return true;
  }

  async resetPassword(token: string, newPassword: string) {
    await delay(1000); // Simulate API call

    const user = this.users.find(u => u.resetToken === token);
    if (!user) {
      throw new Error('Invalid reset token');
    }

    if (user.resetTokenExpiry && user.resetTokenExpiry < new Date()) {
      throw new Error('Reset token has expired');
    }

    // Update password
    user.password = newPassword;
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    user.updatedAt = new Date().toISOString();

    return true;
  }

  async validateResetToken(token: string) {
    await delay(500); // Simulate API call

    const user = this.users.find(u => u.resetToken === token);
    if (!user || !user.resetTokenExpiry || user.resetTokenExpiry < new Date()) {
      return false;
    }

    return true;
  }

  async getCurrentUser() {
    await delay(500); // Simulate API call
    
    const userStr = localStorage.getItem('user');
    if (!userStr) {
      throw new Error('No user found');
    }

    return JSON.parse(userStr);
  }

  async updatePassword(passwordData: { currentPassword: string; newPassword: string }) {
    await delay(1000); // Simulate API call
    
    const userStr = localStorage.getItem('user');
    if (!userStr) {
      throw new Error('No user found');
    }

    const currentUser = JSON.parse(userStr);
    const user = this.users.find(u => u.id === currentUser.id);
    
    if (!user || user.password !== passwordData.currentPassword) {
      throw new Error('Current password is incorrect');
    }

    user.password = passwordData.newPassword;
    user.updatedAt = new Date().toISOString();

    return true;
  }

  async updateProfile(profileData: Partial<User>) {
    await delay(1000); // Simulate API call
    
    const userStr = localStorage.getItem('user');
    if (!userStr) {
      throw new Error('No user found');
    }

    const currentUser = JSON.parse(userStr);
    const user = this.users.find(u => u.id === currentUser.id);
    
    if (!user) {
      throw new Error('User not found');
    }

    Object.assign(user, profileData);
    user.updatedAt = new Date().toISOString();

    const { password: _, ...userWithoutPassword } = user;
    localStorage.setItem('user', JSON.stringify(userWithoutPassword));

    return userWithoutPassword;
  }

  async uploadAvatar(formData: FormData) {
    await delay(1000); // Simulate API call
    
    const userStr = localStorage.getItem('user');
    if (!userStr) {
      throw new Error('No user found');
    }

    const currentUser = JSON.parse(userStr);
    const user = this.users.find(u => u.id === currentUser.id);
    
    if (!user) {
      throw new Error('User not found');
    }

    // Simulate avatar upload
    const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random`;
    user.avatar = avatarUrl;
    user.updatedAt = new Date().toISOString();

    const { password: _, ...userWithoutPassword } = user;
    localStorage.setItem('user', JSON.stringify(userWithoutPassword));

    return { avatar: avatarUrl };
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
}

export const authService = new AuthServiceClass();
export default authService; 