import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Award, Zap, BookOpen } from 'lucide-react';

const RecentActivity: React.FC = () => {
  const activities = [
    { id: 1, type: 'quiz', text: 'Completed Arrays Quiz', time: '2 hours ago', icon: CheckCircle2, color: 'text-emerald-500' },
    { id: 2, type: 'badge', text: 'Earned Quiz Master Badge', time: '5 hours ago', icon: Award, color: 'text-yellow-500' },
    { id: 3, type: 'practice', text: 'Practiced Recursion', time: '1 day ago', icon: BookOpen, color: 'text-blue-500' },
    { id: 4, type: 'streak', text: 'Achieved 5-Day Streak', time: '1 day ago', icon: Zap, color: 'text-orange-500' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="bg-dark-surface/40 backdrop-blur-md border border-white/5 rounded-2xl p-6 shadow-lg relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-l from-brand-primary via-brand-secondary to-transparent opacity-50" />
      
      <div className="flex justify-between items-center mb-6 relative z-10">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Zap className="text-brand-accent" size={24} />
          Recent Activity
        </h3>
      </div>

      <div className="relative border-l border-gray-800 ml-3 space-y-6">
        {activities.map((activity) => (
          <div key={activity.id} className="relative pl-6">
            {/* Timeline Dot */}
            <div className="absolute -left-1.5 top-1 w-3 h-3 rounded-full bg-dark-bg border-2 border-gray-600" />
            
            <div className="flex items-start justify-between group cursor-pointer">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg bg-gray-800/50 transition-colors group-hover:bg-gray-700/50`}>
                  <activity.icon className={activity.color} size={18} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-200 group-hover:text-white transition-colors">{activity.text}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{activity.time}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default RecentActivity;
