import React from 'react';
import { Users as UsersIcon } from 'lucide-react';

const Users: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">User Management</h2>
          <p className="text-gray-400">Manage students, instructors, and system admins.</p>
        </div>
      </div>
      <div className="bg-dark-card border border-gray-800 rounded-2xl p-6 min-h-[400px] flex items-center justify-center">
        <UsersIcon className="text-gray-600 mr-3" size={32} />
        <p className="text-gray-500">User management tools will be implemented in Phase 4.</p>
      </div>
    </div>
  );
};

export default Users;
