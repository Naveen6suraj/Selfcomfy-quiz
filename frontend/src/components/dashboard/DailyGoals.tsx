import React from 'react';
import { motion } from 'framer-motion';
import { Target, CheckCircle } from 'lucide-react';

const DailyGoals: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="bg-dark-card border border-gray-800 rounded-3xl p-6 shadow-lg flex flex-col justify-between"
    >
      <div>
        <div className="flex items-center space-x-2 mb-2">
          <Target className="text-orange-500" size={20} />
          <h3 className="text-xl font-bold text-white">Daily Goals</h3>
        </div>
        <p className="text-sm text-gray-400 mb-6">Complete 3 lessons today to unlock the consistency badge.</p>
        
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <CheckCircle className="text-emerald-500" size={20} />
            <span className="text-gray-300 font-medium line-through decoration-gray-500 text-sm">Read Big O Notation</span>
          </div>
          <div className="flex items-center space-x-3 opacity-50">
            <div className="w-5 h-5 rounded-full border-2 border-gray-500" />
            <span className="text-gray-300 font-medium text-sm">Take Arrays Quiz</span>
          </div>
          <div className="flex items-center space-x-3 opacity-50">
            <div className="w-5 h-5 rounded-full border-2 border-gray-500" />
            <span className="text-gray-300 font-medium text-sm">Review Linked Lists</span>
          </div>
        </div>
      </div>
      
      <div className="mt-6 pt-6 border-t border-gray-800">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Progress</span>
          <span className="text-xs font-bold text-white">1/3</span>
        </div>
        <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: '33%' }}
            transition={{ duration: 1, delay: 0.8 }}
            className="h-full bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default DailyGoals;
