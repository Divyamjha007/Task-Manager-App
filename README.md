# Task Manager App

A full-stack task management application built with React, TypeScript, and Node.js. This application helps users organize and manage their tasks efficiently with features like user authentication, task creation, project management, and more.

## Features

- User Authentication (Login/Register)
- Task Management
- Project Organization
- User Profile Management
- Password Reset Functionality
- Avatar Upload Support
- Responsive Design

## Tech Stack

- Frontend: React, TypeScript, Redux Toolkit
- Backend: Node.js, Express, TypeScript
- Database: MongoDB
- Authentication: JWT
- Deployment: Vercel

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB instance
- Vercel account (for deployment)

## Environment Variables

### Frontend (.env)
```
REACT_APP_API_URL=/api/v1/auth
REACT_APP_NODE_ENV=production
```

### Backend (.env)
```
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=30d
```

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/Task-Manager-App.git
cd Task-Manager-App
```

2. Install dependencies:
```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd server
npm install
```

3. Set up environment variables:
- Copy `.env.example` to `.env` in both root and server directories
- Update the variables with your values

## Development

1. Start the backend server:
```bash
cd server
npm run dev
```

2. Start the frontend development server:
```bash
# From the root directory
npm start
```

The application will be available at `http://localhost:3000`

## Deployment

This project is configured for deployment on Vercel. The `vercel.json` file handles the routing configuration:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "server/src/index.ts",
      "use": "@vercel/node"
    },
    {
      "src": "src/package.json",
      "use": "@vercel/static-build",
      "config": { "distDir": "build" }
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "server/src/index.ts"
    },
    {
      "src": "/(.*)",
      "dest": "src/index.html"
    }
  ]
}
```

### Deployment Steps

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Configure environment variables in Vercel dashboard
4. Deploy!

## API Endpoints

### Authentication
- POST `/api/v1/auth/register` - Register a new user
- POST `/api/v1/auth/login` - Login user
- GET `/api/v1/auth/me` - Get current user
- PUT `/api/v1/auth/updatedetails` - Update user details
- PUT `/api/v1/auth/updatepassword` - Update password
- POST `/api/v1/auth/forgotpassword` - Request password reset
- PUT `/api/v1/auth/resetpassword/:resettoken` - Reset password
- GET `/api/v1/auth/logout` - Logout user

### Tasks
- GET `/api/v1/tasks` - Get all tasks
- POST `/api/v1/tasks` - Create a new task
- PUT `/api/v1/tasks/:id` - Update a task
- DELETE `/api/v1/tasks/:id` - Delete a task

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
