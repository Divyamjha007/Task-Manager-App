import { ObjectId } from 'mongoose';

// Extend Express Request
declare namespace Express {
  export interface User {
    _id: ObjectId;
    name: string;
    email: string;
    role: string;
  }

  export interface Request {
    user?: User;
  }
} 