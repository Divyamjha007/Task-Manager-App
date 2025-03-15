import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const Tasks: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  
  // Mock tasks data
  const tasks = [
    {
      _id: 't1',
      title: 'Design homepage mockup',
      description: 'Create a mockup for the new homepage design',
      status: 'completed',
      priority: 'high',
      assignedTo: 'Jane Smith',
      dueDate: '2023-01-30',
      project: {
        _id: '1',
        name: 'Website Redesign',
      },
    },
    {
      _id: 't2',
      title: 'Implement responsive navigation',
      description: 'Create a responsive navigation menu for the website',
      status: 'in-progress',
      priority: 'medium',
      assignedTo: 'John Doe',
      dueDate: '2023-02-15',
      project: {
        _id: '1',
        name: 'Website Redesign',
      },
    },
    {
      _id: 't3',
      title: 'Optimize images and assets',
      description: 'Optimize all images and assets for better performance',
      status: 'pending',
      priority: 'low',
      assignedTo: 'Bob Johnson',
      dueDate: '2023-02-28',
      project: {
        _id: '1',
        name: 'Website Redesign',
      },
    },
    {
      _id: 't4',
      title: 'Implement contact form',
      description: 'Create a contact form with validation',
      status: 'pending',
      priority: 'medium',
      assignedTo: 'Jane Smith',
      dueDate: '2023-03-10',
      project: {
        _id: '1',
        name: 'Website Redesign',
      },
    },
    {
      _id: 't5',
      title: 'Develop user authentication',
      description: 'Implement user authentication with JWT',
      status: 'in-progress',
      priority: 'high',
      assignedTo: 'John Doe',
      dueDate: '2023-03-15',
      project: {
        _id: '2',
        name: 'Mobile App Development',
      },
    },
    {
      _id: 't6',
      title: 'Create API documentation',
      description: 'Document all API endpoints with examples',
      status: 'pending',
      priority: 'medium',
      assignedTo: 'Bob Johnson',
      dueDate: '2023-03-20',
      project: {
        _id: '2',
        name: 'Mobile App Development',
      },
    },
  ];

  // Filter tasks based on active tab
  const filteredTasks = tasks.filter((task) => {
    if (activeTab === 'all') return true;
    return task.status === activeTab;
  });

  return (
    <div className="py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">Tasks</h1>
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          >
            <svg
              className="-ml-1 mr-2 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            New Task
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <div className="mt-6">
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
              <button
                onClick={() => setActiveTab('all')}
                className={`${
                  activeTab === 'all'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                } whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium`}
              >
                All
              </button>
              <button
                onClick={() => setActiveTab('pending')}
                className={`${
                  activeTab === 'pending'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                } whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium`}
              >
                Pending
              </button>
              <button
                onClick={() => setActiveTab('in-progress')}
                className={`${
                  activeTab === 'in-progress'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                } whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium`}
              >
                In Progress
              </button>
              <button
                onClick={() => setActiveTab('completed')}
                className={`${
                  activeTab === 'completed'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                } whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium`}
              >
                Completed
              </button>
            </nav>
          </div>

          {/* Filters */}
          <div className="mt-4 flex items-center space-x-4">
            <div>
              <label htmlFor="project" className="sr-only">
                Filter by project
              </label>
              <select
                id="project"
                name="project"
                className="rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
                defaultValue="all"
              >
                <option value="all">All Projects</option>
                <option value="1">Website Redesign</option>
                <option value="2">Mobile App Development</option>
              </select>
            </div>
            <div>
              <label htmlFor="priority" className="sr-only">
                Filter by priority
              </label>
              <select
                id="priority"
                name="priority"
                className="rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
                defaultValue="all"
              >
                <option value="all">All Priorities</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
            <div className="relative flex-grow">
              <input
                type="text"
                name="search"
                id="search"
                placeholder="Search tasks..."
                className="block w-full rounded-md border-gray-300 pr-10 focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              />
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <svg
                  className="h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Tasks list */}
          <div className="mt-6 overflow-hidden rounded-lg bg-white shadow">
            <ul className="divide-y divide-gray-200">
              {filteredTasks.map((task) => (
                <li key={task._id} className="px-6 py-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id={`task-${task._id}`}
                        name={`task-${task._id}`}
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                        checked={task.status === 'completed'}
                        readOnly
                      />
                      <div className="ml-3">
                        <Link
                          to={`/dashboard/tasks/${task._id}`}
                          className="text-sm font-medium text-gray-900 hover:text-primary-600"
                        >
                          {task.title}
                        </Link>
                        <p className="text-sm text-gray-500">{task.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex flex-col items-end">
                        <span
                          className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                            task.priority === 'high'
                              ? 'bg-red-100 text-red-800'
                              : task.priority === 'medium'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}
                        >
                          {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                        </span>
                        <span className="mt-1 text-xs text-gray-500">
                          Due: {new Date(task.dueDate).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-sm text-gray-500">{task.assignedTo}</span>
                        <Link
                          to={`/dashboard/projects/${task.project._id}`}
                          className="mt-1 text-xs text-primary-600 hover:text-primary-900"
                        >
                          {task.project.name}
                        </Link>
                      </div>
                      <div>
                        <span
                          className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                            task.status === 'completed'
                              ? 'bg-green-100 text-green-800'
                              : task.status === 'in-progress'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tasks; 