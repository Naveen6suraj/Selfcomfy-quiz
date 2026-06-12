import React, { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, BookOpen, FileText, Network, Lightbulb, Target } from 'lucide-react';
import { useDispatch } from 'react-redux';
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
      className={`flex items-center gap-2 px-6 py-3 font-bold transition-all border-b-2 ${
        activeTab === id 
          ? 'border-brand-primary text-brand-primary bg-brand-primary/5' 
          : 'border-transparent text-gray-400 hover:text-white hover:bg-white/5'
      }`}
    >
      <Icon size={18} /> {label}
    </button>
  );

  return (
    <div className="max-w-[1400px] mx-auto pb-12">
      <div className="flex items-center justify-between mb-6">
        <button 
          onClick={() => navigate('/dashboard/practice')}
          className="flex items-center gap-2 text-dark-muted hover:text-white transition-colors"
        >
          <ArrowLeft size={16} /> Back to Catalog
        </button>

        {/* Top Navigation */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => { setActiveModuleIndex(prev => Math.max(0, prev - 1)); setActiveTab('learn'); }}
            disabled={activeModuleIndex === 0}
            className="px-4 py-2 bg-dark-surface border border-white/10 rounded-lg text-white disabled:opacity-50 hover:bg-white/5 transition-colors font-bold"
          >
            ❮ Previous
          </button>
          <button
            onClick={() => { setActiveModuleIndex(prev => Math.min(courseModules.length - 1, prev + 1)); setActiveTab('learn'); }}
            disabled={activeModuleIndex === courseModules.length - 1}
            className="px-4 py-2 bg-brand-primary hover:bg-brand-primary/90 rounded-lg text-white disabled:opacity-50 transition-colors font-bold"
          >
            Next ❯
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative">
        
        {/* Main Content Area */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-dark-surface/40 backdrop-blur-md border border-white/5 rounded-3xl overflow-hidden shadow-2xl relative">
            <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${courseData.color} opacity-50`} />
            
            {/* Header */}
            <div className="p-8 lg:px-12 lg:pt-12 lg:pb-6 border-b border-white/5">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 flex items-center justify-center">
                  <FileText className="text-brand-primary" size={24} />
                </div>
                <div>
                  <p className="text-brand-primary font-bold tracking-wider text-xs uppercase">Module {activeModuleIndex + 1}</p>
                  <h1 className="text-3xl lg:text-4xl font-bold text-white tracking-tight">{currentModule.title}</h1>
                </div>
              </div>

              {/* Tab Navigation */}
              <div className="flex overflow-x-auto no-scrollbar border-b border-white/10">
                <TabButton id="learn" label="Learning" icon={BookOpen} />
                <TabButton id="quiz" label="Quiz" icon={Target} />
              </div>
            </div>

            {/* Dynamic Tab Content */}
            <div className="p-8 lg:p-12 prose prose-invert max-w-none">
              
              {/* --- LEARN TAB --- */}
              {activeTab === 'learn' && (
                <div className="space-y-10">
                  <section>
                    <h3 className="text-xl font-bold text-white mb-4">Concept Overview</h3>
                    <p className="text-lg text-dark-muted leading-relaxed">{currentModule.conceptOverview}</p>
                  </section>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-[#1A1E26] p-6 rounded-2xl border border-white/5 border-l-4 border-l-blue-500">
                      <h4 className="text-blue-400 font-bold mb-2 flex items-center gap-2"><Lightbulb size={18} /> Beginner Explanation</h4>
                      <p className="text-sm text-gray-300">{currentModule.beginnerExplanation}</p>
                    </div>
                    <div className="bg-[#1A1E26] p-6 rounded-2xl border border-white/5 border-l-4 border-l-orange-500">
                      <h4 className="text-orange-400 font-bold mb-2 flex items-center gap-2"><Network size={18} /> Real World Analogy</h4>
                      <p className="text-sm text-gray-300">{currentModule.realWorldAnalogy}</p>
                    </div>
                  </div>

                  <section>
                    <h3 className="text-xl font-bold text-white mb-4">Deep Explanation</h3>
                    <p className="text-gray-300 leading-relaxed">{currentModule.deepExplanation}</p>
                  </section>
                  
                  <section>
                    <h3 className="text-xl font-bold text-white mb-4">Industry Usage</h3>
                    <p className="text-gray-300 leading-relaxed italic border-l-2 border-white/20 pl-4">{currentModule.industryUsage}</p>
                  </section>
                </div>
              )}



              {/* --- QUIZ TAB --- */}
              {activeTab === 'quiz' && (
                <div className="space-y-10">
                  <section>
                    <h3 className="text-2xl font-bold text-white mb-6">Quiz Challenges</h3>
                    <div className="grid grid-cols-1 gap-6">
                      {currentModule.practiceChallenges?.map((chal, i) => {
                        const [answer, setAnswer] = useState('');
                        const [isSubmitted, setIsSubmitted] = useState(false);

                        return (
                          <div key={i} className={`bg-dark-bg/50 border ${isSubmitted ? 'border-semantic-success/50' : 'border-white/10'} p-6 rounded-2xl relative overflow-hidden transition-all`}>
                            {isSubmitted && <div className="absolute top-0 left-0 w-full h-1 bg-semantic-success" />}
                            
                            <h4 className="text-brand-primary font-bold mb-2 text-lg">Challenge {i + 1}: {chal.title}</h4>
                            <p className="text-gray-300 text-sm mb-6">{chal.description}</p>
                            
                            <div className="bg-brand-secondary/5 border border-brand-secondary/20 p-4 rounded-xl text-sm text-brand-secondary mb-6 flex gap-3">
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
                                  className="w-full bg-dark-surface border border-white/10 rounded-xl p-4 text-white text-sm font-mono focus:outline-none focus:border-brand-primary/50 min-h-[100px] shadow-inner"
                                />
                                <div className="flex justify-end">
                                  <button
                                    onClick={() => answer.trim() && setIsSubmitted(true)}
                                    disabled={!answer.trim()}
                                    className="bg-brand-primary hover:bg-brand-primary/90 text-white px-6 py-2.5 rounded-xl font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-[0_0_15px_rgba(91,140,255,0.2)]"
                                  >
                                    Submit Answer
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <div className="bg-semantic-success/10 border border-semantic-success/20 p-4 rounded-xl flex items-center gap-3 text-semantic-success">
                                <div className="bg-semantic-success/20 p-2 rounded-full">
                                  <CheckCircle2 size={20} />
                                </div>
                                <div>
                                  <p className="font-bold">Great job!</p>
                                  <p className="text-sm text-semantic-success/80">Your answer has been submitted successfully.</p>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </section>
                  
                  <section>
                    <h3 className="text-xl font-bold text-white mb-4">Project: {currentModule.miniProject?.title}</h3>
                    <div className="bg-gradient-to-br from-brand-primary/10 to-brand-secondary/10 border border-brand-primary/20 p-8 rounded-2xl">
                      <p className="text-white font-bold mb-4">{currentModule.miniProject?.objective}</p>
                      <ol className="list-decimal list-inside space-y-2 text-gray-300">
                        {currentModule.miniProject?.steps.map((step, i) => (
                          <li key={i}>{step}</li>
                        ))}
                      </ol>
                    </div>
                  </section>
                </div>
              )}



            </div>

            {/* Bottom Actions */}
            <div className="px-8 lg:px-12 py-6 border-t border-white/5 bg-dark-surface/50 flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <p className="text-dark-muted text-sm">Review the concepts thoroughly before proceeding.</p>
                
                {completedModules.includes(activeModuleIndex) ? (
                  <div className="flex items-center gap-2 px-6 py-3 bg-semantic-success/10 text-semantic-success rounded-full border border-semantic-success/20 font-bold">
                    <CheckCircle2 size={20} /> Module Completed
                  </div>
                ) : (
                  <button 
                    onClick={handleComplete}
                    disabled={isFinishing}
                    className="flex items-center gap-2 px-8 py-3 bg-brand-primary hover:bg-brand-primary/90 text-white rounded-full font-bold shadow-[0_0_20px_rgba(91,140,255,0.3)] transition-all hover:scale-105"
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
              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                <button
                  onClick={() => { setActiveModuleIndex(prev => Math.max(0, prev - 1)); setActiveTab('learn'); }}
                  disabled={activeModuleIndex === 0}
                  className="px-6 py-3 bg-dark-surface border border-white/10 rounded-xl text-white disabled:opacity-50 hover:bg-white/5 transition-colors font-bold flex items-center gap-2"
                >
                  ❮ Previous
                </button>
                <button
                  onClick={() => { setActiveModuleIndex(prev => Math.min(courseModules.length - 1, prev + 1)); setActiveTab('learn'); }}
                  disabled={activeModuleIndex === courseModules.length - 1}
                  className="px-6 py-3 bg-brand-primary hover:bg-brand-primary/90 rounded-xl text-white disabled:opacity-50 transition-colors font-bold flex items-center gap-2"
                >
                  Next ❯
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Syllabus / Modules Sidebar */}
        <div className="lg:col-span-4">
          <div className="bg-dark-surface/40 backdrop-blur-md border border-white/5 rounded-3xl p-6 lg:p-8 h-fit sticky top-24 shadow-xl">
            <div className="flex items-center gap-2 mb-8">
              <BookOpen className="text-brand-primary" size={24} />
              <h3 className="text-2xl font-bold text-white">Syllabus</h3>
            </div>
            
            <div className="space-y-4 relative">
              <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-white/5 z-0" />

              {courseModules.map((mod: RichModule, index: number) => {
                const isCompleted = completedModules.includes(index);
                const isActive = index === activeModuleIndex;
                const showLevelHeader = index === 0 || mod.level !== courseModules[index - 1].level;

                return (
                  <React.Fragment key={index}>
                    {showLevelHeader && (
                      <div className="pt-4 pb-2 z-10 relative">
                        <span className="text-[10px] font-black text-brand-secondary uppercase tracking-[0.2em] px-3 py-1.5 rounded-full border border-brand-secondary/30 bg-brand-secondary/10 shadow-[0_0_15px_rgba(20,184,166,0.15)]">
                          {mod.level || 'General'} Level
                        </span>
                      </div>
                    )}
                    <div 
                      onClick={() => { setActiveModuleIndex(index); setActiveTab('learn'); }}
                      className={`relative z-10 p-4 rounded-2xl border flex items-center gap-4 transition-all cursor-pointer ${
                        isActive 
                          ? 'bg-brand-primary/10 border-brand-primary/30 shadow-[0_0_20px_rgba(91,140,255,0.15)] transform scale-[1.02]' 
                          : isCompleted
                            ? 'bg-dark-bg/80 border-semantic-success/20 hover:border-semantic-success/40'
                            : 'bg-dark-bg/40 border-white/10 hover:border-white/30 hover:bg-white/5'
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-inner transition-colors ${
                        isActive ? 'bg-brand-primary text-white font-bold text-lg' : 
                        isCompleted ? 'bg-semantic-success text-white' : 
                        'bg-dark-surface border border-white/20 text-white font-bold'
                      }`}>
                        {isCompleted ? <CheckCircle2 size={24} /> : index + 1}
                      </div>
                      
                      <div className="flex-1">
                        <p className={`font-bold leading-tight ${isActive ? 'text-brand-primary' : 'text-white'}`}>
                          {mod.title}
                        </p>
                        {isActive && <p className="text-xs text-brand-primary/70 mt-1">Currently Reading</p>}
                      </div>

                    </div>
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
