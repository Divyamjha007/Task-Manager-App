import React from 'react';

const Calendar: React.FC = () => {
  return (
    <div className="py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">Calendar</h1>
        <p className="mt-1 text-sm text-gray-500">
          View and manage your tasks and events in a calendar view.
        </p>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <div className="mt-6">
          <div className="overflow-hidden rounded-lg bg-white shadow">
            <div className="p-6">
              <div className="text-center">
                <p className="text-lg font-medium text-gray-900">
                  Calendar view coming soon!
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  This feature is currently under development.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar; 