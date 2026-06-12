import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, ChevronUp, ChevronDown, Minus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const leaderboard = [
  { rank: 1, name: 'Alex Johnson', xp: 4250, change: 'up', avatar: 'bg-brand-primary' },
  { rank: 2, name: 'Sarah Chen', xp: 3890, change: 'up', avatar: 'bg-brand-secondary' },
  { rank: 3, name: 'You', xp: 2450, change: 'same', avatar: 'bg-brand-accent' },
  { rank: 4, name: 'Mike Ross', xp: 2100, change: 'down', avatar: 'bg-semantic-warning' },
];

const LeaderboardWidget: React.FC = () => {
  const navigate = useNavigate();
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="bg-dark-surface/40 backdrop-blur-md border border-white/5 rounded-2xl p-6 shadow-lg relative overflow-hidden flex flex-col h-full"
    >
      <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-l from-semantic-warning via-brand-primary to-transparent opacity-50" />

      <div className="flex items-center space-x-2 mb-6">
        <Trophy className="text-semantic-warning" size={24} />
        <h3 className="text-xl font-bold text-white">Class Leaderboard</h3>
      </div>

      <div className="space-y-3 flex-1">
        {leaderboard.map((student) => (
          <div 
            key={student.rank} 
            className={`flex items-center p-3 rounded-xl transition-all duration-300 border border-transparent ${
              student.name === 'You' 
                ? 'bg-brand-primary/10 border-brand-primary/30 shadow-[0_0_15px_rgba(91,140,255,0.1)]' 
                : 'hover:bg-white/5 hover:border-white/10'
            }`}
          >
            <span className={`w-6 font-bold text-sm ${student.rank <= 3 ? 'text-semantic-warning' : 'text-dark-muted'}`}>
              #{student.rank}
            </span>
            
            <div className={`w-8 h-8 rounded-full ${student.avatar} flex items-center justify-center text-white font-bold text-xs ml-2 mr-3 shadow-lg`}>
              {student.name.charAt(0)}
            </div>
            
            <div className="flex-1">
              <p className={`font-semibold text-sm ${student.name === 'You' ? 'text-brand-primary' : 'text-white'}`}>
                {student.name}
              </p>
              <p className="text-xs text-dark-muted font-medium">{student.xp.toLocaleString()} XP</p>
            </div>

            <div className="w-6 flex justify-end">
              {student.change === 'up' && <ChevronUp className="text-semantic-success" size={16} />}
              {student.change === 'down' && <ChevronDown className="text-semantic-danger" size={16} />}
              {student.change === 'same' && <Minus className="text-dark-muted" size={16} />}
            </div>
          </div>
        ))}
      </div>
      
      <button 
        onClick={() => navigate('/dashboard/achievements')}
        className="w-full mt-5 py-2.5 bg-dark-surface hover:bg-white/5 border border-white/5 rounded-full text-sm font-semibold text-dark-muted hover:text-white transition-all duration-300"
      >
        View Full Leaderboard
      </button>
    </motion.div>
  );
};

export default LeaderboardWidget;
