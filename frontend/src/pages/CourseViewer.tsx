import React, { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, BookOpen, FileText, Network, Lightbulb, Target } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { updateUser } from '../store/slices/authSlice';
import api from '../services/api';
import { courseDetails, type RichModule } from '../data/courseData';

const CourseViewer: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  
  const courseData = id && courseDetails[id] ? courseDetails[id] : courseDetails['html-css'];
  const courseModules: RichModule[] = courseData?.modules || [];

  const queryParams = new URLSearchParams(location.search);
  const initialTab = (queryParams.get('tab') as 'learn' | 'quiz') || 'learn';

  const [activeModuleIndex, setActiveModuleIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'learn' | 'quiz'>(initialTab);
  const [completedModules, setCompletedModules] = useState<number[]>([]);
  const [isFinishing, setIsFinishing] = useState(false);

  // If there's no module, just return early or show error
  if (!courseModules.length) return <div className="text-white p-10">Course data not found.</div>;

  const currentModule = courseModules[activeModuleIndex];

  const handleComplete = async () => {
    if (completedModules.includes(activeModuleIndex)) return;
    setIsFinishing(true);
    try {
      const { data } = await api.put('/auth/progress', {
        xpEarned: 150,
        scorePercentage: 100
      });
      setTimeout(() => {
        setCompletedModules(prev => [...prev, activeModuleIndex]);
        if (activeModuleIndex < courseModules.length - 1) {
          setActiveModuleIndex(prev => prev + 1);
          setActiveTab('learn'); // reset tab on new module
        }
        setIsFinishing(false);
        dispatch(updateUser(data));
      }, 800);
    } catch (error) {
      console.error('Failed to sync progress:', error);
      setIsFinishing(false);
    }
  };

  const TabButton = ({ id, label, icon: Icon }: { id: typeof activeTab, label: string, icon: any }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`relative flex items-center gap-2 px-6 py-4 font-bold transition-all ${
        activeTab === id 
          ? 'text-brand-primary' 
          : 'text-dark-muted hover:text-white hover:bg-white/5'
      }`}
    >
      <Icon size={18} /> {label}
      {activeTab === id && (
        <motion.div 
          layoutId="activeTab"
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-primary shadow-[0_0_10px_rgba(91,140,255,0.8)]"
        />
      )}
    </button>
  );

  return (
    <div className="max-w-[1400px] mx-auto pb-12 relative z-10">
      <div className="flex items-center justify-between mb-8">
        <button 
          onClick={() => navigate('/dashboard/practice')}
          className="flex items-center gap-2 text-dark-muted hover:text-white transition-colors group px-4 py-2 bg-dark-surface/50 rounded-full border border-white/5 backdrop-blur-sm"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Catalog
        </button>

        {/* Top Navigation */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => { setActiveModuleIndex(prev => Math.max(0, prev - 1)); setActiveTab('learn'); }}
            disabled={activeModuleIndex === 0}
            className="px-5 py-2.5 glass-card border border-white/10 rounded-full text-white disabled:opacity-50 hover:bg-white/10 transition-colors font-bold text-sm"
          >
            ❮ Previous
          </button>
          <button
            onClick={() => { setActiveModuleIndex(prev => Math.min(courseModules.length - 1, prev + 1)); setActiveTab('learn'); }}
            disabled={activeModuleIndex === courseModules.length - 1}
            className="px-5 py-2.5 bg-brand-primary hover:bg-brand-primary/90 rounded-full text-white disabled:opacity-50 transition-colors font-bold text-sm shadow-[0_0_15px_rgba(91,140,255,0.3)]"
          >
            Next ❯
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative">
        
        {/* Main Content Area */}
        <div className="lg:col-span-8 space-y-6">
          <div className="glass border border-white/5 rounded-[2rem] overflow-hidden shadow-2xl relative">
            <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${courseData.color} opacity-50`} />
            
            {/* Header */}
            <div className="p-8 lg:px-12 lg:pt-12 lg:pb-0 border-b border-white/5 bg-dark-bg/40">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-2xl bg-brand-primary/10 flex items-center justify-center border border-brand-primary/20 shadow-inner">
                  <FileText className="text-brand-primary" size={28} />
                </div>
                <div>
                  <p className="text-brand-primary font-bold tracking-widest text-[10px] uppercase mb-1 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-brand-primary animate-pulse" />
                    Module {activeModuleIndex + 1} of {courseModules.length}
                  </p>
                  <h1 className="text-3xl lg:text-4xl font-bold text-white tracking-tight">{currentModule.title}</h1>
                </div>
              </div>

              {/* Tab Navigation */}
              <div className="flex overflow-x-auto no-scrollbar relative">
                <TabButton id="learn" label="Learning Material" icon={BookOpen} />
                <TabButton id="quiz" label="Interactive Quiz" icon={Target} />
              </div>
            </div>

            {/* Dynamic Tab Content with AnimatePresence */}
            <div className="p-8 lg:p-12 overflow-hidden bg-dark-bg/20 min-h-[500px]">
              <AnimatePresence mode="wait">
              
                {/* --- LEARN TAB --- */}
                {activeTab === 'learn' && (
                  <motion.div 
                    key="learn"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-10 prose prose-invert max-w-none"
                  >
                    <section>
                      <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <span className="text-brand-primary">#</span> Concept Overview
                      </h3>
                      <p className="text-lg text-dark-muted leading-relaxed">{currentModule.conceptOverview}</p>
                    </section>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="glass-card p-6 rounded-2xl border border-white/5 border-l-4 border-l-blue-500 hover:-translate-y-1 transition-transform">
                        <h4 className="text-blue-400 font-bold mb-3 flex items-center gap-2"><Lightbulb size={18} /> Beginner Explanation</h4>
                        <p className="text-sm text-gray-300 leading-relaxed">{currentModule.beginnerExplanation}</p>
                      </div>
                      <div className="glass-card p-6 rounded-2xl border border-white/5 border-l-4 border-l-brand-accent hover:-translate-y-1 transition-transform">
                        <h4 className="text-brand-accent font-bold mb-3 flex items-center gap-2"><Network size={18} /> Real World Analogy</h4>
                        <p className="text-sm text-gray-300 leading-relaxed">{currentModule.realWorldAnalogy}</p>
                      </div>
                    </div>

                    <section className="glass p-8 rounded-2xl border border-white/5">
                      <h3 className="text-xl font-bold text-white mb-4">Deep Explanation</h3>
                      <p className="text-gray-300 leading-relaxed">{currentModule.deepExplanation}</p>
                    </section>
                    
                    <section>
                      <h3 className="text-xl font-bold text-white mb-4">Industry Usage</h3>
                      <div className="bg-brand-secondary/5 border border-brand-secondary/20 p-6 rounded-2xl border-l-4 border-l-brand-secondary">
                        <p className="text-gray-300 leading-relaxed italic">"{currentModule.industryUsage}"</p>
                      </div>
                    </section>
                  </motion.div>
                )}

                {/* --- QUIZ TAB --- */}
                {activeTab === 'quiz' && (
                  <motion.div 
                    key="quiz"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-10"
                  >
                    <section>
                      <h3 className="text-2xl font-bold text-white mb-6">Quiz Challenges</h3>
                      <div className="grid grid-cols-1 gap-6">
                        {currentModule.practiceChallenges?.map((chal, i) => {
                          const [answer, setAnswer] = useState('');
                          const [isSubmitted, setIsSubmitted] = useState(false);

                          return (
                            <div key={i} className={`glass border ${isSubmitted ? 'border-semantic-success/50' : 'border-white/10'} p-8 rounded-[2rem] relative overflow-hidden transition-all shadow-lg`}>
                              {isSubmitted && <div className="absolute top-0 left-0 w-full h-1.5 bg-semantic-success shadow-[0_0_10px_rgba(34,197,94,0.5)]" />}
                              
                              <h4 className="text-brand-primary font-bold mb-3 text-lg">Challenge {i + 1}: {chal.title}</h4>
                              <p className="text-gray-300 text-sm mb-6 leading-relaxed">{chal.description}</p>
                              
                              <div className="bg-brand-secondary/10 border border-brand-secondary/30 p-5 rounded-2xl text-sm text-brand-secondary mb-6 flex gap-3 shadow-inner">
                                <Lightbulb size={18} className="shrink-0 mt-0.5" />
                                <div>
                                  <strong className="block mb-1 font-black uppercase tracking-wider text-[10px]">Hint</strong> 
                                  {chal.hint}
                                </div>
                              </div>

                              {!isSubmitted ? (
                                <div className="space-y-4">
                                  <textarea
                                    value={answer}
                                    onChange={(e) => setAnswer(e.target.value)}
                                    placeholder="Type your answer or code here..."
                                    className="input-premium w-full rounded-2xl p-5 text-sm font-mono min-h-[120px]"
                                  />
                                  <div className="flex justify-end">
                                    <button
                                      onClick={() => answer.trim() && setIsSubmitted(true)}
                                      disabled={!answer.trim()}
                                      className="bg-brand-primary hover:bg-brand-primary/90 text-white px-8 py-3 rounded-full font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-[0_0_20px_rgba(91,140,255,0.3)] hover:scale-105"
                                    >
                                      Submit Answer
                                    </button>
                                  </div>
                                </div>
                              ) : (
                                <motion.div 
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  className="bg-semantic-success/10 border border-semantic-success/30 p-5 rounded-2xl flex items-center gap-4 text-semantic-success"
                                >
                                  <div className="bg-semantic-success/20 p-3 rounded-full shadow-inner">
                                    <CheckCircle2 size={24} />
                                  </div>
                                  <div>
                                    <p className="font-bold text-lg">Great job!</p>
                                    <p className="text-sm text-semantic-success/80 mt-1">Your answer has been submitted successfully.</p>
                                  </div>
                                </motion.div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </section>
                    
                    {currentModule.miniProject && (
                      <section>
                        <h3 className="text-xl font-bold text-white mb-4">Project: {currentModule.miniProject.title}</h3>
                        <div className="glass border border-brand-primary/30 p-8 rounded-[2rem] shadow-[0_0_30px_rgba(91,140,255,0.05)]">
                          <p className="text-white font-bold mb-6 text-lg">{currentModule.miniProject.objective}</p>
                          <ol className="space-y-4">
                            {currentModule.miniProject.steps.map((step, i) => (
                              <li key={i} className="flex gap-4 items-start">
                                <div className="w-8 h-8 rounded-full bg-brand-primary/20 text-brand-primary flex items-center justify-center font-bold text-sm shrink-0 border border-brand-primary/30">
                                  {i + 1}
                                </div>
                                <p className="text-gray-300 mt-1">{step}</p>
                              </li>
                            ))}
                          </ol>
                        </div>
                      </section>
                    )}
                  </motion.div>
                )}

              </AnimatePresence>
            </div>

            {/* Bottom Actions */}
            <div className="px-8 lg:px-12 py-6 border-t border-white/5 bg-dark-bg/60 flex flex-col gap-6 backdrop-blur-xl">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-dark-muted text-sm text-center sm:text-left">Review the concepts thoroughly before proceeding.</p>
                
                {completedModules.includes(activeModuleIndex) ? (
                  <div className="flex items-center gap-2 px-8 py-3.5 bg-semantic-success/10 text-semantic-success rounded-full border border-semantic-success/30 font-bold shadow-inner">
                    <CheckCircle2 size={20} /> Module Completed
                  </div>
                ) : (
                  <button 
                    onClick={handleComplete}
                    disabled={isFinishing}
                    className="flex items-center gap-2 px-8 py-3.5 bg-brand-primary hover:bg-brand-primary/90 text-white rounded-full font-bold shadow-[0_0_20px_rgba(91,140,255,0.4)] transition-all hover:shadow-[0_0_30px_rgba(91,140,255,0.6)] hover:-translate-y-0.5 w-full sm:w-auto justify-center"
                  >
                    {isFinishing ? (
                      <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    ) : (
                      <CheckCircle2 size={20} />
                    )}
                    <span>Mark as Read (+150 XP)</span>
                  </button>
                )}
              </div>

              {/* Bottom Navigation */}
              <div className="flex items-center justify-between pt-6 border-t border-white/5">
                <button
                  onClick={() => { setActiveModuleIndex(prev => Math.max(0, prev - 1)); setActiveTab('learn'); }}
                  disabled={activeModuleIndex === 0}
                  className="px-6 py-3 glass-card border border-white/10 rounded-full text-white disabled:opacity-50 hover:bg-white/10 transition-colors font-bold flex items-center gap-2 text-sm"
                >
                  ❮ Previous
                </button>
                <button
                  onClick={() => { setActiveModuleIndex(prev => Math.min(courseModules.length - 1, prev + 1)); setActiveTab('learn'); }}
                  disabled={activeModuleIndex === courseModules.length - 1}
                  className="px-6 py-3 bg-brand-primary hover:bg-brand-primary/90 rounded-full text-white disabled:opacity-50 transition-colors font-bold flex items-center gap-2 text-sm shadow-[0_0_15px_rgba(91,140,255,0.3)]"
                >
                  Next ❯
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Syllabus / Modules Sidebar */}
        <div className="lg:col-span-4">
          <div className="glass border border-white/5 rounded-[2rem] p-6 lg:p-8 h-fit sticky top-28 shadow-2xl">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2.5 rounded-xl bg-brand-primary/10 text-brand-primary shadow-inner">
                <BookOpen size={24} />
              </div>
              <h3 className="text-2xl font-bold text-white tracking-tight">Syllabus</h3>
            </div>
            
            <div className="space-y-3 relative">
              <div className="absolute left-[1.35rem] top-8 bottom-8 w-0.5 bg-gradient-to-b from-brand-primary/50 via-white/10 to-transparent z-0" />

              {courseModules.map((mod: RichModule, index: number) => {
                const isCompleted = completedModules.includes(index);
                const isActive = index === activeModuleIndex;
                const showLevelHeader = index === 0 || mod.level !== courseModules[index - 1].level;

                return (
                  <React.Fragment key={index}>
                    {showLevelHeader && (
                      <div className="pt-6 pb-3 z-10 relative pl-12">
                        <span className="text-[10px] font-black text-brand-secondary uppercase tracking-[0.2em] px-3 py-1.5 rounded-full border border-brand-secondary/30 bg-brand-secondary/10 shadow-[0_0_15px_rgba(20,184,166,0.15)]">
                          {mod.level || 'General'} Level
                        </span>
                      </div>
                    )}
                    <motion.div 
                      whileHover={{ x: 4 }}
                      onClick={() => { setActiveModuleIndex(index); setActiveTab('learn'); }}
                      className={`relative z-10 p-4 rounded-2xl border flex items-center gap-4 transition-all cursor-pointer ${
                        isActive 
                          ? 'bg-brand-primary/10 border-brand-primary/40 shadow-[0_0_20px_rgba(91,140,255,0.15)] backdrop-blur-md' 
                          : isCompleted
                            ? 'glass-card border-semantic-success/20 hover:border-semantic-success/40'
                            : 'glass-card border-white/5 hover:border-white/20'
                      }`}
                    >
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 shadow-inner transition-colors duration-500 ${
                        isActive ? 'bg-brand-primary text-white font-bold text-lg shadow-[0_0_15px_rgba(91,140,255,0.4)]' : 
                        isCompleted ? 'bg-semantic-success text-white' : 
                        'bg-dark-surface border border-white/10 text-white font-bold'
                      }`}>
                        {isCompleted ? <CheckCircle2 size={20} /> : index + 1}
                      </div>
                      
                      <div className="flex-1">
                        <p className={`font-bold leading-tight text-sm ${isActive ? 'text-brand-primary' : 'text-white'}`}>
                          {mod.title}
                        </p>
                        {isActive && <p className="text-[10px] font-bold uppercase tracking-wider text-brand-primary/70 mt-1">Currently Reading</p>}
                      </div>

                    </motion.div>
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default CourseViewer;
