import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const TaskDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(false);
  
  // Mock task data
  const task = {
    _id: id,
    title: 'Implement responsive navigation',
    description: 'Create a responsive navigation menu for the website that works well on mobile, tablet, and desktop devices. The navigation should collapse into a hamburger menu on smaller screens and expand on larger screens. It should also highlight the active page.',
    status: 'in-progress',
    priority: 'medium',
    assignedTo: 'John Doe',
    dueDate: '2023-02-15',
    createdAt: '2023-01-10T12:00:00Z',
    updatedAt: '2023-01-15T14:30:00Z',
    project: {
      _id: '1',
      name: 'Website Redesign',
    },
    comments: [
      {
        _id: 'c1',
        user: 'Jane Smith',
        text: 'I have some design ideas for this. Let me know when you want to discuss.',
        createdAt: '2023-01-12T10:15:00Z',
      },
      {
        _id: 'c2',
        user: 'John Doe',
        text: 'I\'ve started working on this. Should have a prototype ready by tomorrow.',
        createdAt: '2023-01-14T09:30:00Z',
      },
    ],
    attachments: [
      {
        _id: 'a1',
        name: 'navigation-mockup.png',
        size: '1.2 MB',
        uploadedBy: 'Jane Smith',
        uploadedAt: '2023-01-12T10:20:00Z',
      },
    ],
  };

  const [newComment, setNewComment] = useState('');

  // Simulate loading effect
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [id]);

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would dispatch an action to add the comment
    console.log('Adding comment:', newComment);
    setNewComment('');
  };

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center py-12">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary-200 border-t-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center">
              <Link
                to="/dashboard/tasks"
                className="mr-2 text-sm font-medium text-primary-600 hover:text-primary-500"
              >
                Tasks
              </Link>
              <svg
                className="h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="ml-2 text-sm font-medium text-gray-500">
                {task.title}
              </span>
            </div>
            <h1 className="mt-2 text-2xl font-semibold text-gray-900">
              {task.title}
            </h1>
          </div>
          <div className="flex space-x-3">
            <button
              type="button"
              className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              <svg
                className="-ml-1 mr-2 h-5 w-5 text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
              Edit
            </button>
            <div className="relative inline-block text-left">
              <select
                id="status"
                name="status"
                className="rounded-md border-gray-300 py-2 pl-3 pr-10 text-sm font-medium text-gray-700 focus:border-primary-500 focus:outline-none focus:ring-primary-500"
                defaultValue={task.status}
              >
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Task details */}
          <div className="lg:col-span-2">
            <div className="overflow-hidden rounded-lg bg-white shadow">
              <div className="px-4 py-5 sm:p-6">
                <h2 className="text-lg font-medium text-gray-900">Description</h2>
                <p className="mt-2 text-sm text-gray-500">{task.description}</p>

                <h2 className="mt-6 text-lg font-medium text-gray-900">Comments</h2>
                <div className="mt-2 space-y-4">
                  {task.comments.map((comment) => (
                    <div key={comment._id} className="rounded-lg bg-gray-50 p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-sm font-medium text-primary-700">
                            {comment.user.split(' ').map(n => n[0]).join('')}
                          </div>
                          <span className="ml-3 text-sm font-medium text-gray-900">
                            {comment.user}
                          </span>
                        </div>
                        <span className="text-xs text-gray-500">
                          {new Date(comment.createdAt).toLocaleString()}
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-gray-500">{comment.text}</p>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleCommentSubmit} className="mt-4">
                  <div>
                    <label htmlFor="comment" className="sr-only">
                      Add a comment
                    </label>
                    <textarea
                      id="comment"
                      name="comment"
                      rows={3}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                      placeholder="Add a comment..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                    ></textarea>
                  </div>
                  <div className="mt-3 flex justify-end">
                    <button
                      type="submit"
                      className="inline-flex items-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                    >
                      Add Comment
                    </button>
                  </div>
                </form>

                <h2 className="mt-6 text-lg font-medium text-gray-900">Attachments</h2>
                <ul className="mt-2 divide-y divide-gray-200 border-t border-gray-200">
                  {task.attachments.map((attachment) => (
                    <li
                      key={attachment._id}
                      className="flex items-center justify-between py-3"
                    >
                      <div className="flex items-center">
                        <svg
                          className="h-5 w-5 flex-shrink-0 text-gray-400"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="ml-2 text-sm font-medium text-primary-600">
                          {attachment.name}
                        </span>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        <span className="text-xs text-gray-500">
                          {attachment.size}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Task metadata */}
          <div>
            <div className="overflow-hidden rounded-lg bg-white shadow">
              <div className="px-4 py-5 sm:p-6">
                <h2 className="text-lg font-medium text-gray-900">Details</h2>
                <dl className="mt-4 space-y-4">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Status</dt>
                    <dd className="mt-1">
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
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Priority</dt>
                    <dd className="mt-1">
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
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Assigned To</dt>
                    <dd className="mt-1 text-sm text-gray-900">{task.assignedTo}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Due Date</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {new Date(task.dueDate).toLocaleDateString()}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Project</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      <Link
                        to={`/dashboard/projects/${task.project._id}`}
                        className="text-primary-600 hover:text-primary-900"
                      >
                        {task.project.name}
                      </Link>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Created</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {new Date(task.createdAt).toLocaleString()}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Last Updated</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {new Date(task.updatedAt).toLocaleString()}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails; 