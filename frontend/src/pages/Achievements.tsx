import React from 'react';
import { Award, Zap, Star, Shield } from 'lucide-react';

const Achievements: React.FC = () => {
  const badges = [
    { title: 'First Quiz Passed', icon: Star, color: 'text-yellow-500', bg: 'bg-yellow-500/10', unlocked: true, desc: 'You passed your first subject quiz!' },
    { title: 'Perfect Score', icon: Shield, color: 'text-emerald-500', bg: 'bg-emerald-500/10', unlocked: false, desc: 'Score 100% on any quiz.' },
    { title: '7-Day Streak', icon: Zap, color: 'text-orange-500', bg: 'bg-orange-500/10', unlocked: false, desc: 'Log in and practice for 7 days straight.' },
    { title: 'Top 1% Rank', icon: Award, color: 'text-purple-500', bg: 'bg-purple-500/10', unlocked: false, desc: 'Reach the top 1% of students globally.' },
  ];

  return (
    <div className="space-y-6 relative">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">Your Achievements</h2>
          <p className="text-gray-400">Unlock badges and climb the global leaderboard!</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {badges.map((badge) => (
          <div 
            key={badge.title} 
            className={`group bg-dark-card border border-gray-800 rounded-2xl p-6 flex flex-col items-center justify-center text-center space-y-4 transition-all hover:border-gray-600 hover:shadow-lg ${badge.unlocked ? 'cursor-pointer hover:scale-105' : 'opacity-50 grayscale cursor-not-allowed'}`}
            title={badge.desc}
          >
            <div className={`p-5 rounded-full ${badge.bg} transition-transform group-hover:scale-110`}>
              <badge.icon className={badge.color} size={40} />
            </div>
            <div>
              <h3 className="font-bold text-white">{badge.title}</h3>
              <p className="text-xs text-gray-500 mt-1">{badge.unlocked ? 'Unlocked' : 'Locked'}</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Achievements;
