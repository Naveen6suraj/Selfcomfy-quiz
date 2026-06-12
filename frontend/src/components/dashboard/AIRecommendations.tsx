import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, PlayCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const recommendations = [
  {
    id: 1,
    title: 'Advanced Graph Algorithms',
    reason: 'Based on your recent struggles in Data Structures',
    duration: '45 mins',
    match: 98,
    difficulty: 'Hard',
    color: 'from-brand-primary to-brand-secondary'
  },
  {
    id: 2,
    title: 'Dynamic Programming Patterns',
    reason: 'Perfect next step for your skill level',
    duration: '1.5 hrs',
    match: 92,
    difficulty: 'Medium',
    color: 'from-brand-secondary to-brand-accent'
  }
];

const AIRecommendations: React.FC = () => {
  const navigate = useNavigate();
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-dark-surface/40 backdrop-blur-md border border-white/5 rounded-2xl p-6 shadow-lg relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-secondary to-brand-accent opacity-50" />
      
      <div className="flex items-center space-x-2 mb-6">
        <Sparkles className="text-brand-accent" size={24} />
        <h3 className="text-xl font-bold text-white">AI Recommendations</h3>
      </div>

      <div className="space-y-4">
        {recommendations.map((rec) => (
          <div 
            key={rec.id} 
            className="group bg-dark-bg/40 border border-white/5 rounded-xl p-5 hover:border-brand-primary/30 transition-all duration-300 relative overflow-hidden flex flex-col h-full"
          >
            {/* Subtle glow effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-3">
                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${rec.difficulty === 'Hard' ? 'bg-semantic-danger/10 text-semantic-danger border border-semantic-danger/20' : 'bg-semantic-warning/10 text-semantic-warning border border-semantic-warning/20'}`}>
                  {rec.difficulty}
                </span>
                <span className="text-xs font-semibold text-brand-accent bg-brand-accent/10 px-2.5 py-1 rounded-full border border-brand-accent/20">
                  {rec.match}% Match
                </span>
              </div>
              
              <h4 className="font-bold text-white mb-1 group-hover:text-brand-primary transition-colors text-lg">{rec.title}</h4>
              <p className="text-xs text-dark-muted mb-4">{rec.reason}</p>
              
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                <span className="text-xs font-medium text-dark-muted flex items-center gap-1.5">
                  <PlayCircle size={14} /> {rec.duration}
                </span>
                <button 
                  onClick={() => navigate('/dashboard/practice')}
                  className="flex items-center space-x-1 text-sm font-semibold text-brand-primary hover:text-brand-primary/80 transition-colors"
                >
                  <span>Start</span>
                  <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default AIRecommendations;
