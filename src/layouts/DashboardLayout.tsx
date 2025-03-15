import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/navigation/Sidebar';
import Header from '../components/navigation/Header';
import Footer from '../components/navigation/Footer';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, User } from '../store/slices/authSlice';
import { selectSidebarOpen, setSidebarOpen, setIsMobile } from '../store/slices/uiSlice';
import { RootState, AppDispatch } from '../store';

// Mock user for when authentication is disabled
const mockUser: User = {
  id: 'mock-user-id',
  name: 'Demo User',
  email: 'demo@example.com',
  role: 'admin' as 'admin' | 'manager' | 'employee',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

const DashboardLayout: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector(selectUser);
  const sidebarOpen = useSelector(selectSidebarOpen);

  // Use mock user if real user is null
  const currentUser = user || mockUser;

  useEffect(() => {
    const handleResize = () => {
      dispatch(setIsMobile(window.innerWidth < 768));
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [dispatch]);

  const handleSidebarToggle = (open: boolean) => {
    dispatch(setSidebarOpen(open));
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} setIsOpen={handleSidebarToggle} />

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header */}
        <Header
          sidebarOpen={sidebarOpen}
          setSidebarOpen={handleSidebarToggle}
          user={currentUser}
        />

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 md:p-6">
          <div className="mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default DashboardLayout; 