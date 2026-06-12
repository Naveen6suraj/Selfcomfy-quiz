import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { BookOpen, CheckCircle2 } from 'lucide-react';

const LearningProgress: React.FC = () => {
  const navigate = useNavigate();
  const courses = [
    { title: 'Data Structures', progress: 75, status: 'In Progress', color: 'bg-blue-500' },
    { title: 'Algorithms', progress: 40, status: 'In Progress', color: 'bg-purple-500' },
    { title: 'Database Systems', progress: 100, status: 'Completed', color: 'bg-emerald-500' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-dark-surface/40 backdrop-blur-md border border-white/5 rounded-2xl p-6 shadow-lg relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent opacity-50" />
      
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-white">Learning Progress</h3>
        <button 
          onClick={() => navigate('/dashboard/practice')}
          className="text-sm font-medium text-primary-400 hover:text-primary-300 transition-colors"
        >
          View All
        </button>
      </div>

      <div className="space-y-6">
        {courses.map((course) => (
          <div key={course.title} className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                {course.progress === 100 ? (
                  <CheckCircle2 className="text-emerald-500" size={18} />
                ) : (
                  <BookOpen className="text-gray-400" size={18} />
                )}
                <span className="font-medium text-gray-200">{course.title}</span>
              </div>
              <span className="text-sm text-gray-400">{course.progress}%</span>
            </div>
            
            {/* Progress Bar */}
            <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${course.progress}%` }}
                transition={{ duration: 1, delay: 0.5, type: 'spring' }}
                className={`h-full rounded-full ${course.color}`}
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default LearningProgress;
