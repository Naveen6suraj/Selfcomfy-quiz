import React from 'react';
import { motion } from 'framer-motion';
import { Award, Book, Target, TrendingUp, ArrowUpRight } from 'lucide-react';

interface StatsGridProps {
  user: any;
}

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const item = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
};

const StatsGrid: React.FC<StatsGridProps> = ({ user }) => {
  const stats = [
    { label: 'XP Earned', value: (user?.xp || 0).toLocaleString(), icon: Award, trend: '+15% this week' },
    { label: 'Quizzes Taken', value: (user?.quizzesTaken || 0).toString(), icon: Book, trend: '+3 this week' },
    { label: 'Accuracy', value: `${user?.accuracy || 0}%`, icon: Target, trend: '+6% this week' },
    { label: 'Current Streak', value: `${user?.streak || 0} Days`, icon: TrendingUp, trend: 'Personal best: 14' },
  ];

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
    >
      {stats.map((stat) => (
        <motion.div 
          key={stat.label} 
          variants={item}
          whileHover={{ y: -4, scale: 1.01 }}
          className="bg-dark-surface/40 backdrop-blur-sm border border-white/5 rounded-2xl p-5 relative overflow-hidden group shadow-lg transition-all duration-300"
        >
          {/* Subtle gradient background on hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div className="flex justify-between items-start mb-3">
              <div className="p-2.5 rounded-xl bg-brand-primary/10 text-brand-primary shadow-[0_0_15px_rgba(91,140,255,0.15)] group-hover:shadow-[0_0_20px_rgba(91,140,255,0.3)] transition-shadow">
                <stat.icon size={18} />
              </div>
              <div className="flex items-center space-x-1 text-semantic-success text-[10px] font-bold bg-semantic-success/10 px-2 py-1 rounded-full border border-semantic-success/20">
                <ArrowUpRight size={10} />
                <span>Up</span>
              </div>
            </div>
            
            <div>
              <p className="text-xs font-semibold text-dark-muted mb-1">{stat.label}</p>
              <h3 className="text-3xl font-bold text-white tracking-tight leading-none mb-3">{stat.value}</h3>
            </div>
            
            <div className="flex items-center space-x-2 pt-3 border-t border-white/5">
              {/* Mini Sparkline Mock */}
              <div className="flex items-end space-x-0.5 h-3">
                {[4, 7, 5, 8, 6, 9].map((h, i) => (
                  <div key={i} className="w-1 bg-brand-primary/40 rounded-t-sm" style={{ height: `${h * 10}%` }} />
                ))}
              </div>
              <p className="text-[10px] font-medium text-dark-muted truncate">{stat.trend}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default StatsGrid;
