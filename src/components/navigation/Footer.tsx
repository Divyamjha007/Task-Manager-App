import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="mx-auto max-w-7xl px-4 py-4 md:flex md:items-center md:justify-between">
        <div className="flex justify-center space-x-6 md:order-2">
          <Link to="/dashboard/help" className="text-gray-400 hover:text-gray-500">
            Help
          </Link>
          <Link to="/dashboard/privacy" className="text-gray-400 hover:text-gray-500">
            Privacy
          </Link>
          <Link to="/dashboard/terms" className="text-gray-400 hover:text-gray-500">
            Terms
          </Link>
        </div>
        <div className="mt-4 md:order-1 md:mt-0">
          <p className="text-center text-sm text-gray-400">
            &copy; {currentYear} Task Manager. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 