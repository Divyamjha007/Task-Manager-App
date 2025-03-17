import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useSelector } from 'react-redux';
import { selectUser } from '../store/slices/authSlice';
import { EmptyState } from '../components/ui/EmptyState';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

// Dummy data
const dummyProjects = [
  {
    id: 1,
    name: 'Task Manager App',
    description: 'A modern task management application built with React',
    status: 'in-progress',
    progress: 65,
    members: 4,
    tasks: 12,
  },
  {
    id: 2,
    name: 'E-commerce Platform',
    description: 'Online shopping platform with advanced features',
    status: 'planning',
    progress: 25,
    members: 6,
    tasks: 24,
  },
  // Add more dummy projects as needed
];

const Projects: React.FC = () => {
  const user = useSelector(selectUser);
  const [projects] = useState(dummyProjects);

  if (!user) {
    return (
      <EmptyState
        title="Access Denied"
        description="Please log in to view projects"
        icon="alert"
      />
    );
  }

  if (projects.length === 0) {
    return (
      <EmptyState
        title="No projects found"
        description="Get started by creating your first project"
        action={
          <Button className="mt-4">
            <Plus className="mr-2 h-4 w-4" />
            Create Project
          </Button>
        }
      />
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Projects</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Project
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Card key={project.id} className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg">{project.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{project.description}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs ${
                project.status === 'completed'
                  ? 'bg-green-100 text-green-800'
                  : project.status === 'in-progress'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {project.status}
              </span>
            </div>

            <div className="mt-4">
              <div className="flex justify-between text-sm text-muted-foreground mb-2">
                <span>Progress</span>
                <span>{project.progress}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-primary rounded-full h-2 transition-all"
                  style={{ width: `${project.progress}%` }}
                />
              </div>
            </div>

            <div className="flex justify-between items-center mt-4 pt-4 border-t">
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <span className="text-sm text-muted-foreground">{project.members} members</span>
                </div>
                <div className="flex items-center">
                  <span className="text-sm text-muted-foreground">{project.tasks} tasks</span>
                </div>
              </div>
              <Button variant="outline" size="sm">View Details</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Projects; 