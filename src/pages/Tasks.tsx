import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useSelector } from 'react-redux';
import { selectUser } from '../store/slices/authSlice';
import { EmptyState } from '../components/ui/EmptyState';
import { Button } from '../components/ui/Button';

// Dummy data
const dummyTasks = [
  {
    id: 1,
    title: 'Complete project documentation',
    description: 'Write comprehensive documentation for the new features',
    status: 'in-progress',
    priority: 'high',
    dueDate: '2024-03-20',
  },
  {
    id: 2,
    title: 'Review pull requests',
    description: 'Review and merge pending pull requests',
    status: 'todo',
    priority: 'medium',
    dueDate: '2024-03-18',
  },
  // Add more dummy tasks as needed
];

const Tasks: React.FC = () => {
  const user = useSelector(selectUser);
  const [tasks] = useState(dummyTasks);

  if (!user) {
    return (
      <EmptyState
        title="Access Denied"
        description="Please log in to view your tasks"
        icon="alert"
      />
    );
  }

  if (tasks.length === 0) {
    return (
      <EmptyState
        title="No tasks found"
        description="Get started by creating your first task"
        action={
          <Button className="mt-4">
            <Plus className="mr-2 h-4 w-4" />
            Create Task
          </Button>
        }
      />
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Tasks</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Task
        </Button>
      </div>
      
      <div className="grid gap-4">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="p-4 rounded-lg border bg-card hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">{task.title}</h3>
              <span className={`px-2 py-1 rounded-full text-xs ${
                task.priority === 'high' 
                  ? 'bg-red-100 text-red-800'
                  : task.priority === 'medium'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-green-100 text-green-800'
              }`}>
                {task.priority}
              </span>
            </div>
            <p className="text-sm text-muted-foreground mt-2">{task.description}</p>
            <div className="flex items-center justify-between mt-4">
              <span className="text-sm text-muted-foreground">
                Due: {new Date(task.dueDate).toLocaleDateString()}
              </span>
              <span className={`px-2 py-1 rounded-full text-xs ${
                task.status === 'completed'
                  ? 'bg-green-100 text-green-800'
                  : task.status === 'in-progress'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {task.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tasks; 