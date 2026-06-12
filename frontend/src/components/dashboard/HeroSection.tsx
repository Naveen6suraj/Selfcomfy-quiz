import React from 'react';
import { motion } from 'framer-motion';
import { Flame, Star, ChevronRight, Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface HeroProps {
  user: any;
}

const HeroSection: React.FC<HeroProps> = ({ user }) => {
  const navigate = useNavigate();
  const name = user?.name?.split(' ')[0] || 'Learner';
  const streak = user?.streak || 0;
  const xp = user?.xp || 0;
  const level = Math.floor(xp / 1000) + 1;
  const progressPercent = (xp % 1000) / 10;
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-2xl bg-dark-card border border-white/5 p-6 lg:p-8 shadow-2xl"
    >
      {/* Premium Glass Effect Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/10 via-transparent to-brand-secondary/5 pointer-events-none" />
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-brand-primary/10 blur-[80px] pointer-events-none mix-blend-screen" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Side: Welcome & Action */}
        <div className="lg:col-span-7 space-y-4">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center space-x-2 bg-dark-surface/80 border border-white/5 px-3 py-1.5 rounded-full"
          >
            <Star className="text-brand-accent" size={14} />
            <span className="text-xs font-bold tracking-wide text-dark-muted uppercase">Level {level} Scholar</span>
          </motion.div>
          
          <h1 className="text-3xl lg:text-4xl font-bold text-white tracking-tight">
            Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-accent">{name}</span>
          </h1>
          
          <p className="text-base text-dark-muted max-w-xl">
            You're {1000 - (xp % 1000)} XP away from reaching Level {level + 1}. Keep your streak alive today!
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <button 
              onClick={() => navigate('/dashboard/practice')}
              className="bg-brand-primary hover:bg-brand-primary/90 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all shadow-[0_0_15px_rgba(91,140,255,0.3)] hover:shadow-[0_0_25px_rgba(91,140,255,0.5)] flex items-center space-x-1.5"
            >
              <span>Continue Learning</span>
              <ChevronRight size={16} />
            </button>
            <button 
              onClick={() => navigate('/dashboard/achievements')}
              className="bg-dark-surface hover:bg-white/5 border border-white/5 text-white px-5 py-2.5 rounded-full text-sm font-medium transition-all"
            >
              View Analytics
            </button>
          </div>
        </div>

        {/* Right Side: Compact Stats */}
        <div className="lg:col-span-5 grid grid-cols-2 gap-4">
          {/* XP Progress Card */}
          <div className="bg-dark-surface/50 border border-white/5 rounded-2xl p-4 flex flex-col items-center justify-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            
            {/* SVG Circle Progress */}
            <div className="relative w-20 h-20 mb-3 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="8" className="text-dark-bg" />
                <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="8" strokeDasharray="283" strokeDashoffset={283 - (283 * progressPercent) / 100} className="text-brand-primary" strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-lg font-bold text-white">{progressPercent}%</span>
              </div>
            </div>
            <p className="text-xs font-semibold tracking-wider text-dark-muted uppercase">Level Progress</p>
          </div>

          {/* Mini Stats Column */}
          <div className="flex flex-col gap-4">
            <div className="flex-1 bg-dark-surface/50 border border-white/5 rounded-2xl p-4 flex items-center space-x-3 group hover:border-brand-accent/30 transition-colors">
              <div className="p-2.5 rounded-xl bg-brand-accent/10 text-brand-accent">
                <Flame size={18} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-dark-muted uppercase tracking-wider mb-0.5">Current Streak</p>
                <p className="text-xl font-bold text-white leading-none">{streak} <span className="text-sm font-medium text-dark-muted">Days</span></p>
              </div>
            </div>
            
            <div className="flex-1 bg-dark-surface/50 border border-white/5 rounded-2xl p-4 flex items-center space-x-3 group hover:border-semantic-warning/30 transition-colors">
              <div className="p-2.5 rounded-xl bg-semantic-warning/10 text-semantic-warning">
                <Target size={18} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-dark-muted uppercase tracking-wider mb-0.5">Total XP</p>
                <p className="text-xl font-bold text-white leading-none">{xp.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default HeroSection;
