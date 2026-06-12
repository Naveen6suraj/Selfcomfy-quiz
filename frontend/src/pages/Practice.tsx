import React, { useState } from 'react';
import { Target, Flame, BookOpen, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';

const cseCatalog = [
  { id: 'python', title: 'Python Mastery', desc: 'Learn Python from scratch to advanced data science.', icon: '🐍', color: 'from-blue-500/20 to-yellow-500/20', border: 'border-blue-500/30' },
  { id: 'javascript', title: 'JavaScript Deep Dive', desc: 'Master ES6+, async programming, and DOM manipulation.', icon: '⚡', color: 'from-yellow-400/20 to-yellow-600/20', border: 'border-yellow-500/30' },
  { id: 'java', title: 'Java & OOP', desc: 'Object-oriented programming, Spring Boot, and microservices.', icon: '☕', color: 'from-red-500/20 to-orange-500/20', border: 'border-red-500/30' },
  { id: 'html-css', title: 'HTML & CSS Design', desc: 'Build responsive, accessible, and beautiful web interfaces.', icon: '🎨', color: 'from-orange-500/20 to-blue-500/20', border: 'border-orange-500/30' },
  { id: 'bash', title: 'Bash & Shell Scripting', desc: 'Automate tasks and master the Linux command line.', icon: '🐧', color: 'from-gray-500/20 to-gray-700/20', border: 'border-gray-500/30' },
  { id: 'cpp', title: 'C++ Systems Programming', desc: 'Memory management, pointers, and high-performance code.', icon: '⚙️', color: 'from-blue-600/20 to-indigo-600/20', border: 'border-blue-600/30' },
];

const civilCatalog = [
  { id: 'strength', title: 'Strength of Materials', desc: 'Understand stress, strain, and material properties.', icon: '🏗️', color: 'from-amber-500/20 to-orange-500/20', border: 'border-amber-500/30' },
  { id: 'surveying', title: 'Advanced Surveying', desc: 'Learn modern surveying techniques and GPS.', icon: '📐', color: 'from-green-500/20 to-emerald-500/20', border: 'border-green-500/30' },
  { id: 'structural', title: 'Structural Analysis', desc: 'Analyze forces in trusses, beams, and frames.', icon: '🌉', color: 'from-blue-500/20 to-cyan-500/20', border: 'border-blue-500/30' },
  { id: 'geotech', title: 'Geotechnical Engineering', desc: 'Soil mechanics and foundation engineering.', icon: '🌍', color: 'from-yellow-700/20 to-yellow-900/20', border: 'border-yellow-700/30' },
];

const cseQuizzes = [
  { id: 'demo-1', title: 'Data Structures', desc: 'Test your knowledge on Trees, Stacks, Queues, and Time Complexity.', questions: 3, xp: 150 },
];

const civilQuizzes = [
  { id: 'strength', title: 'Stress & Strain', desc: 'Test your knowledge on elasticity, forces, and Hooke\'s Law.', questions: 3, xp: 150 },
];

const Practice: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);

  const userBranch = (user as any)?.branch || '';
  const displayCatalog = userBranch.toLowerCase().includes('civil') ? civilCatalog : cseCatalog;
  const displayQuizzes = userBranch.toLowerCase().includes('civil') ? civilQuizzes : cseQuizzes;
  
  return (
    <div className="space-y-10 max-w-[1400px] mx-auto pb-12 relative">
      <div className="bg-dark-surface/40 backdrop-blur-md border border-white/5 rounded-2xl p-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent opacity-50" />
        <h2 className="text-3xl font-bold text-white mb-2">Practice Hub</h2>
        <p className="text-dark-muted">Master your skills through concept quizzes, and comprehensive courses.</p>
      </div>

      {/* Concept Quizzes Section - MOVED TO TOP */}
      <div>
        <div className="flex items-center gap-2 mb-6">
          <Target className="text-brand-primary" size={24} />
          <h3 className="text-2xl font-bold text-white">Concept Quizzes</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayQuizzes.map(quiz => (
            <div 
              key={quiz.id}
              onClick={() => navigate(`/dashboard/course/${quiz.id}?tab=quiz`)}
              className="group bg-dark-bg/40 border border-white/5 rounded-xl p-6 hover:border-brand-secondary/30 transition-all duration-300 relative overflow-hidden flex flex-col min-h-[220px] cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-brand-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-brand-secondary/10 rounded-xl group-hover:scale-110 transition-transform">
                    <Target className="text-brand-secondary" size={24} />
                  </div>
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider bg-white/5 text-dark-muted border border-white/10">{quiz.questions} Qs</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-brand-secondary transition-colors">{quiz.title}</h3>
                <p className="text-sm text-dark-muted line-clamp-2">{quiz.desc}</p>
                
                <div className="mt-auto pt-6 flex items-center justify-between border-t border-white/5">
                  <span className="text-xs text-semantic-warning font-bold flex items-center gap-1">
                    +{quiz.xp} XP <Flame size={14} />
                  </span>
                  <span className="text-sm font-semibold text-brand-secondary group-hover:text-brand-secondary/80">Start Quiz &rarr;</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Course Catalog Section */}
      <div>
        <div className="flex items-center gap-2 mb-6">
          <BookOpen className="text-brand-secondary" size={24} />
          <h3 className="text-2xl font-bold text-white">Full Course Catalog</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayCatalog.map(course => (
            <div 
              key={course.id}
              onClick={() => setSelectedCourse(course.id)}
              className={`group bg-dark-bg/40 border border-white/5 rounded-xl p-6 hover:${course.border} transition-all duration-300 relative overflow-hidden flex flex-col min-h-[200px] cursor-pointer`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${course.color} opacity-0 group-hover:opacity-100 transition-opacity`} />
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex justify-between items-start mb-4">
                  <div className="text-4xl group-hover:scale-110 transition-transform">
                    {course.icon}
                  </div>
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider bg-white/5 text-white border border-white/10">Course</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{course.title}</h3>
                <p className="text-sm text-dark-muted line-clamp-2">{course.desc}</p>
                
                <div className="mt-auto pt-6 flex items-center justify-between border-t border-white/5">
                  <span className="text-sm font-semibold text-white/70 group-hover:text-white transition-colors">Start Learning &rarr;</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>



      {/* Mode Selection Modal */}
      {selectedCourse && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-dark-card border border-white/10 rounded-3xl w-full max-w-lg p-8 relative animate-in zoom-in-95 duration-300 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
            <button 
              onClick={() => setSelectedCourse(null)}
              className="absolute top-4 right-4 text-dark-muted hover:text-white bg-white/5 hover:bg-white/10 rounded-full p-2 transition-colors"
            >
              <X size={20} />
            </button>
            
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-2">Choose Your Path</h3>
              <p className="text-dark-muted">How would you like to proceed with this subject?</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button 
                onClick={() => { navigate(`/dashboard/course/${selectedCourse}?tab=learn`); setSelectedCourse(null); }}
                className="group flex flex-col items-center p-6 bg-dark-bg border border-white/5 hover:border-brand-primary rounded-2xl transition-all duration-300 hover:bg-brand-primary/5"
              >
                <div className="w-16 h-16 rounded-full bg-brand-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <BookOpen className="text-brand-primary" size={32} />
                </div>
                <h4 className="text-lg font-bold text-white mb-1">Learning</h4>
                <p className="text-xs text-center text-dark-muted">Read concepts & theory</p>
              </button>

              <button 
                onClick={() => { navigate(`/dashboard/course/${selectedCourse}?tab=quiz`); setSelectedCourse(null); }}
                className="group flex flex-col items-center p-6 bg-dark-bg border border-white/5 hover:border-brand-secondary rounded-2xl transition-all duration-300 hover:bg-brand-secondary/5"
              >
                <div className="w-16 h-16 rounded-full bg-brand-secondary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Target className="text-brand-secondary" size={32} />
                </div>
                <h4 className="text-lg font-bold text-white mb-1">Quiz</h4>
                <p className="text-xs text-center text-dark-muted">Test your knowledge</p>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Practice;
