import React from 'react';
import { Users, BookOpen, PenTool, TrendingUp } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const stats = [
    { label: 'Total Students', value: '1,248', icon: Users, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { label: 'Active Subjects', value: '42', icon: BookOpen, color: 'text-purple-500', bg: 'bg-purple-500/10' },
    { label: 'Total Quizzes', value: '156', icon: PenTool, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { label: 'Avg Score', value: '76%', icon: TrendingUp, color: 'text-orange-500', bg: 'bg-orange-500/10' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Platform Overview</h2>
        <button className="bg-primary-600 hover:bg-primary-500 text-white px-4 py-2 rounded-lg font-medium transition-colors">
          Generate Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-dark-card border border-gray-800 rounded-2xl p-6 flex items-center space-x-4">
            <div className={`p-4 rounded-xl ${stat.bg}`}>
              <stat.icon className={`${stat.color}`} size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-400">{stat.label}</p>
              <h3 className="text-2xl font-bold text-white mt-1">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-dark-card border border-gray-800 rounded-2xl p-6 min-h-[400px] flex items-center justify-center">
        <p className="text-gray-500">Analytics Charts will be implemented here (Phase 4)</p>
      </div>
    </div>
  );
};

export default AdminDashboard;
