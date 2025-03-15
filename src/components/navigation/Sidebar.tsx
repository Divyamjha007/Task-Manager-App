import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from '../../store/slices/authSlice';
import { setSidebarOpen } from '../../store/slices/uiSlice';
import { RootState, AppDispatch } from '../../store';
import {
  LayoutDashboard,
  ListTodo,
  FolderKanban,
  Calendar,
  Users,
  Settings,
  X,
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch<AppDispatch>();

  const handleCloseSidebar = () => {
    setIsOpen(false);
    dispatch(setSidebarOpen(false));
  };

  return (
    <>
      {/* Mobile sidebar */}
      <div
        className={`fixed inset-0 z-40 flex md:hidden ${
          isOpen ? 'visible' : 'invisible'
        }`}
        role="dialog"
        aria-modal="true"
      >
        {/* Overlay */}
        <div
          className={`fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity duration-300 ease-linear ${
            isOpen ? 'opacity-100' : 'opacity-0'
          }`}
          aria-hidden="true"
          onClick={handleCloseSidebar}
        ></div>

        {/* Sidebar panel */}
        <div
          className={`relative flex w-full max-w-xs flex-1 flex-col bg-white pt-5 pb-4 transition duration-300 ease-in-out ${
            isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          {/* Close button */}
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              type="button"
              className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={handleCloseSidebar}
            >
              <span className="sr-only">Close sidebar</span>
              <X className="h-6 w-6 text-white" aria-hidden="true" />
            </button>
          </div>

          {/* Logo */}
          <div className="flex flex-shrink-0 items-center px-4">
            <img
              className="h-8 w-auto"
              src="/logo.svg"
              alt="Task Manager"
            />
            <span className="ml-2 text-xl font-bold text-gray-900">
              Task Manager
            </span>
          </div>

          {/* Navigation */}
          <div className="mt-5 h-0 flex-1 overflow-y-auto">
            <nav className="space-y-1 px-2">
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `group flex items-center rounded-md px-2 py-2 text-sm font-medium ${
                    isActive
                      ? 'bg-primary-100 text-primary-900'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`
                }
                end
              >
                <LayoutDashboard
                  className="mr-3 h-5 w-5 flex-shrink-0"
                  aria-hidden="true"
                />
                Dashboard
              </NavLink>

              <NavLink
                to="/dashboard/tasks"
                className={({ isActive }) =>
                  `group flex items-center rounded-md px-2 py-2 text-sm font-medium ${
                    isActive
                      ? 'bg-primary-100 text-primary-900'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`
                }
              >
                <ListTodo
                  className="mr-3 h-5 w-5 flex-shrink-0"
                  aria-hidden="true"
                />
                Tasks
              </NavLink>

              <NavLink
                to="/dashboard/projects"
                className={({ isActive }) =>
                  `group flex items-center rounded-md px-2 py-2 text-sm font-medium ${
                    isActive
                      ? 'bg-primary-100 text-primary-900'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`
                }
              >
                <FolderKanban
                  className="mr-3 h-5 w-5 flex-shrink-0"
                  aria-hidden="true"
                />
                Projects
              </NavLink>

              <NavLink
                to="/dashboard/calendar"
                className={({ isActive }) =>
                  `group flex items-center rounded-md px-2 py-2 text-sm font-medium ${
                    isActive
                      ? 'bg-primary-100 text-primary-900'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`
                }
              >
                <Calendar
                  className="mr-3 h-5 w-5 flex-shrink-0"
                  aria-hidden="true"
                />
                Calendar
              </NavLink>

              {user && user.role === 'admin' && (
                <NavLink
                  to="/dashboard/admin"
                  className={({ isActive }) =>
                    `group flex items-center rounded-md px-2 py-2 text-sm font-medium ${
                      isActive
                        ? 'bg-primary-100 text-primary-900'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`
                  }
                >
                  <Users
                    className="mr-3 h-5 w-5 flex-shrink-0"
                    aria-hidden="true"
                  />
                  Admin
                </NavLink>
              )}

              <NavLink
                to="/dashboard/settings"
                className={({ isActive }) =>
                  `group flex items-center rounded-md px-2 py-2 text-sm font-medium ${
                    isActive
                      ? 'bg-primary-100 text-primary-900'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`
                }
              >
                <Settings
                  className="mr-3 h-5 w-5 flex-shrink-0"
                  aria-hidden="true"
                />
                Settings
              </NavLink>
            </nav>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
        <div className="flex min-h-0 flex-1 flex-col border-r border-gray-200 bg-white">
          <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
            <div className="flex flex-shrink-0 items-center px-4">
              <img
                className="h-8 w-auto"
                src="/logo.svg"
                alt="Task Manager"
              />
              <span className="ml-2 text-xl font-bold text-gray-900">
                Task Manager
              </span>
            </div>
            <nav className="mt-5 flex-1 space-y-1 px-2">
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `group flex items-center rounded-md px-2 py-2 text-sm font-medium ${
                    isActive
                      ? 'bg-primary-100 text-primary-900'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`
                }
                end
              >
                <LayoutDashboard
                  className="mr-3 h-5 w-5 flex-shrink-0"
                  aria-hidden="true"
                />
                Dashboard
              </NavLink>

              <NavLink
                to="/dashboard/tasks"
                className={({ isActive }) =>
                  `group flex items-center rounded-md px-2 py-2 text-sm font-medium ${
                    isActive
                      ? 'bg-primary-100 text-primary-900'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`
                }
              >
                <ListTodo
                  className="mr-3 h-5 w-5 flex-shrink-0"
                  aria-hidden="true"
                />
                Tasks
              </NavLink>

              <NavLink
                to="/dashboard/projects"
                className={({ isActive }) =>
                  `group flex items-center rounded-md px-2 py-2 text-sm font-medium ${
                    isActive
                      ? 'bg-primary-100 text-primary-900'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`
                }
              >
                <FolderKanban
                  className="mr-3 h-5 w-5 flex-shrink-0"
                  aria-hidden="true"
                />
                Projects
              </NavLink>

              <NavLink
                to="/dashboard/calendar"
                className={({ isActive }) =>
                  `group flex items-center rounded-md px-2 py-2 text-sm font-medium ${
                    isActive
                      ? 'bg-primary-100 text-primary-900'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`
                }
              >
                <Calendar
                  className="mr-3 h-5 w-5 flex-shrink-0"
                  aria-hidden="true"
                />
                Calendar
              </NavLink>

              {user && user.role === 'admin' && (
                <NavLink
                  to="/dashboard/admin"
                  className={({ isActive }) =>
                    `group flex items-center rounded-md px-2 py-2 text-sm font-medium ${
                      isActive
                        ? 'bg-primary-100 text-primary-900'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`
                  }
                >
                  <Users
                    className="mr-3 h-5 w-5 flex-shrink-0"
                    aria-hidden="true"
                  />
                  Admin
                </NavLink>
              )}

              <NavLink
                to="/dashboard/settings"
                className={({ isActive }) =>
                  `group flex items-center rounded-md px-2 py-2 text-sm font-medium ${
                    isActive
                      ? 'bg-primary-100 text-primary-900'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`
                }
              >
                <Settings
                  className="mr-3 h-5 w-5 flex-shrink-0"
                  aria-hidden="true"
                />
                Settings
              </NavLink>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar; 