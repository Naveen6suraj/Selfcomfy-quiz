import React from 'react';
import { Plus, PenTool } from 'lucide-react';

const Quizzes: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">Quizzes & Assessments</h2>
          <p className="text-gray-400">Manage all quizzes across all subjects.</p>
        </div>
        <button className="flex items-center space-x-2 bg-primary-600 hover:bg-primary-500 text-white px-4 py-2 rounded-lg font-medium transition-colors">
          <Plus size={20} />
          <span>Create Quiz</span>
        </button>
      </div>

      <div className="bg-dark-card border border-gray-800 rounded-2xl p-6 min-h-[400px] flex flex-col items-center justify-center space-y-4">
        <div className="p-4 bg-gray-800/50 rounded-full">
          <PenTool className="text-gray-400" size={48} />
        </div>
        <h3 className="text-xl font-medium text-white">No Quizzes Created Yet</h3>
        <p className="text-gray-500 max-w-md text-center">
          You haven't added any quizzes to the platform. Click "Create Quiz" to add questions to a subject.
        </p>
      </div>
    </div>
  );
};

export default Quizzes;
