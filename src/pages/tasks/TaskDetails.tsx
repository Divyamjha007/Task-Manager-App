import React from 'react';
import { useParams } from 'react-router-dom';

const TaskDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Task Details</h1>
      <div className="bg-white rounded-lg shadow p-4">
        <p>Task details for ID: {id}</p>
      </div>
    </div>
  );
};

export default TaskDetails; 