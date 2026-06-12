import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, ArrowRight, Award, Flame, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateUser } from '../store/slices/authSlice';
import api from '../services/api';

// Demo Quiz Data
const DEMO_QUIZ = {
  id: 'demo-1',
  title: 'Data Structures Fundamentals',
  subject: 'Computer Science',
  questions: [
    {
      id: 1,
      text: 'What is the time complexity of searching in a balanced Binary Search Tree (BST)?',
      options: ['O(1)', 'O(n)', 'O(log n)', 'O(n^2)'],
      correctAnswer: 2,
      explanation: 'In a balanced BST, half of the remaining nodes are eliminated at each step, leading to logarithmic time complexity.'
    },
    {
      id: 2,
      text: 'Which data structure uses LIFO (Last In, First Out) principle?',
      options: ['Queue', 'Stack', 'Linked List', 'Array'],
      correctAnswer: 1,
      explanation: 'A Stack follows the Last In, First Out (LIFO) principle, where the last element added is the first one to be removed.'
    },
    {
      id: 3,
      text: 'What is the worst-case time complexity of QuickSort?',
      options: ['O(n log n)', 'O(n)', 'O(log n)', 'O(n^2)'],
      correctAnswer: 3,
      explanation: 'The worst-case scenario for QuickSort occurs when the pivot is always the smallest or largest element, degrading to O(n^2).'
    }
  ]
};

const QuizTaker: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [isFinishing, setIsFinishing] = useState(false);

  const currentQuestion = DEMO_QUIZ.questions[currentQuestionIndex];
  const isCorrect = selectedOption === currentQuestion.correctAnswer;
  const progressPercent = ((currentQuestionIndex) / DEMO_QUIZ.questions.length) * 100;

  const handleSelectOption = (index: number) => {
    if (!isAnswerSubmitted) {
      setSelectedOption(index);
    }
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null) return;
    
    setIsAnswerSubmitted(true);
    if (selectedOption === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = async () => {
    if (currentQuestionIndex < DEMO_QUIZ.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      // Quiz finished, submit progress
      setIsFinishing(true);
      const finalScore = isCorrect ? score + 1 : score;
      const percentage = Math.round((finalScore / DEMO_QUIZ.questions.length) * 100);
      const xpEarned = finalScore * 50;
      
      try {
        const { data } = await api.put('/auth/progress', {
          xpEarned,
          scorePercentage: percentage
        });
        dispatch(updateUser(data));
      } catch (error) {
        console.error('Failed to sync progress:', error);
      } finally {
        setIsFinishing(false);
        setShowResults(true);
      }
    }
  };

  if (showResults) {
    const percentage = Math.round((score / DEMO_QUIZ.questions.length) * 100);
    const passed = percentage >= 60;
    
    return (
      <div className="min-h-[80vh] flex items-center justify-center relative">
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[120px] pointer-events-none mix-blend-screen ${passed ? 'bg-emerald-500/10' : 'bg-red-500/10'}`} />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="max-w-2xl w-full glass border border-white/10 rounded-[3rem] p-12 text-center shadow-[0_0_50px_rgba(0,0,0,0.5)] relative z-10"
        >
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', bounce: 0.5 }}
            className={`w-32 h-32 mx-auto rounded-3xl flex items-center justify-center mb-8 shadow-2xl ${passed ? 'bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-emerald-500/30' : 'bg-gradient-to-br from-red-400 to-red-600 shadow-red-500/30'} rotate-3`}
          >
            {passed ? <Award className="text-white" size={64} /> : <XCircle className="text-white" size={64} />}
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-4xl lg:text-5xl font-black text-white tracking-tight mb-4">
              {passed ? 'Quiz Passed!' : 'Needs Improvement'}
            </h2>
            <p className="text-lg text-dark-muted mb-10 max-w-md mx-auto">
              You scored <strong className="text-white">{score}</strong> out of <strong className="text-white">{DEMO_QUIZ.questions.length}</strong> correct.
            </p>
            
            <div className="grid grid-cols-2 gap-6 mb-10">
              <div className="glass-card rounded-2xl p-6 border border-white/5 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10">
                  <p className="text-xs font-bold text-dark-muted uppercase tracking-wider mb-2">XP Earned</p>
                  <p className="text-4xl font-black text-brand-accent flex items-center justify-center gap-3">
                    +{score * 50} <Flame size={28} className="fill-brand-accent text-brand-accent" />
                  </p>
                </div>
              </div>
              <div className="glass-card rounded-2xl p-6 border border-white/5 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10">
                  <p className="text-xs font-bold text-dark-muted uppercase tracking-wider mb-2">Accuracy</p>
                  <p className="text-4xl font-black text-emerald-400 flex items-center justify-center gap-2">
                    {percentage}%
                  </p>
                </div>
              </div>
            </div>

            <button 
              onClick={() => navigate('/dashboard/practice')}
              className="bg-brand-primary hover:bg-brand-primary/90 text-white px-8 py-4 rounded-full font-bold transition-all w-full md:w-auto md:min-w-[250px] shadow-[0_0_20px_rgba(91,140,255,0.3)] hover:shadow-[0_0_30px_rgba(91,140,255,0.5)] hover:-translate-y-1"
            >
              Return to Practice
            </button>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Progress Header */}
      <div className="glass border border-white/5 rounded-3xl p-6 lg:p-8 flex flex-col md:flex-row items-start md:items-center justify-between shadow-xl gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-xl bg-brand-primary/10 text-brand-primary">
              <Zap size={20} />
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">{DEMO_QUIZ.title}</h2>
          </div>
          <p className="text-sm font-semibold text-dark-muted tracking-wide ml-[3.25rem]">
            QUESTION {currentQuestionIndex + 1} OF {DEMO_QUIZ.questions.length}
          </p>
        </div>
        
        <div className="w-full md:w-1/3 flex flex-col gap-2">
          <div className="flex justify-between text-xs font-bold text-dark-muted">
            <span>Progress</span>
            <span className="text-brand-primary">{Math.round(progressPercent)}%</span>
          </div>
          <div className="h-2 w-full bg-dark-bg/80 rounded-full overflow-hidden shadow-inner">
            <motion.div 
              className="h-full bg-gradient-to-r from-brand-primary to-brand-secondary rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.5, type: 'spring' }}
            />
          </div>
        </div>
      </div>

      {/* Question Area with AnimatePresence */}
      <div className="relative min-h-[500px]">
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentQuestionIndex}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.4, type: 'spring', damping: 25 }}
            className="glass-card border border-white/5 rounded-[2.5rem] p-8 lg:p-12 shadow-2xl"
          >
            <h3 className="text-2xl lg:text-3xl font-bold text-white mb-10 leading-relaxed tracking-tight">
              {currentQuestion.text}
            </h3>

            <div className="space-y-4">
              {currentQuestion.options.map((option, index) => {
                const isSelected = selectedOption === index;
                const isCorrectOption = index === currentQuestion.correctAnswer;
                
                let buttonStyle = "border-white/10 hover:border-brand-primary/50 hover:bg-white/5";
                let textStyle = "text-gray-300";
                
                if (isAnswerSubmitted) {
                  if (isCorrectOption) {
                    buttonStyle = "border-emerald-500 bg-emerald-500/10 shadow-[0_0_20px_rgba(16,185,129,0.15)]";
                    textStyle = "text-white font-bold";
                  } else if (isSelected && !isCorrectOption) {
                    buttonStyle = "border-semantic-danger bg-semantic-danger/10";
                    textStyle = "text-white font-bold";
                  } else {
                    buttonStyle = "border-white/5 opacity-40";
                  }
                } else if (isSelected) {
                  buttonStyle = "border-brand-primary bg-brand-primary/20 shadow-[0_0_20px_rgba(91,140,255,0.1)]";
                  textStyle = "text-white font-bold";
                }

                return (
                  <motion.button
                    whileHover={!isAnswerSubmitted ? { scale: 1.01 } : {}}
                    whileTap={!isAnswerSubmitted ? { scale: 0.99 } : {}}
                    key={index}
                    onClick={() => handleSelectOption(index)}
                    disabled={isAnswerSubmitted}
                    className={`w-full text-left p-6 rounded-2xl border-2 transition-all duration-300 flex justify-between items-center group ${buttonStyle}`}
                  >
                    <span className={`text-lg transition-colors ${textStyle}`}>
                      <span className="inline-block w-8 font-mono text-dark-muted group-hover:text-brand-primary/50 transition-colors">
                        {String.fromCharCode(65 + index)}.
                      </span>
                      {option}
                    </span>
                    
                    {isAnswerSubmitted && isCorrectOption && (
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="bg-emerald-500/20 p-2 rounded-full">
                        <CheckCircle2 className="text-emerald-500" size={24} />
                      </motion.div>
                    )}
                    {isAnswerSubmitted && isSelected && !isCorrectOption && (
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="bg-semantic-danger/20 p-2 rounded-full">
                        <XCircle className="text-semantic-danger" size={24} />
                      </motion.div>
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* Action Area */}
            <div className="mt-12 pt-8 border-t border-white/5">
              {!isAnswerSubmitted ? (
                <div className="flex justify-end">
                  <button
                    onClick={handleSubmitAnswer}
                    disabled={selectedOption === null}
                    className={`py-4 px-10 rounded-full font-bold text-lg transition-all flex items-center gap-2 ${
                      selectedOption !== null 
                        ? 'bg-brand-primary hover:bg-brand-primary/90 text-white shadow-[0_0_20px_rgba(91,140,255,0.3)] hover:shadow-[0_0_30px_rgba(91,140,255,0.5)] hover:-translate-y-1' 
                        : 'glass-card text-dark-muted cursor-not-allowed border-white/5'
                    }`}
                  >
                    Check Answer
                  </button>
                </div>
              ) : (
                <div className="space-y-8">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-6 rounded-2xl border flex gap-4 ${isCorrect ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-semantic-danger/10 border-semantic-danger/30'}`}
                  >
                    <div className="shrink-0 mt-1">
                      {isCorrect ? (
                        <CheckCircle2 className="text-emerald-400" size={28} />
                      ) : (
                        <XCircle className="text-semantic-danger" size={28} />
                      )}
                    </div>
                    <div>
                      <h4 className={`text-xl font-bold mb-2 ${isCorrect ? 'text-emerald-400' : 'text-semantic-danger'}`}>
                        {isCorrect ? 'Awesome! That is correct.' : 'Not quite right.'}
                      </h4>
                      <p className="text-gray-300 leading-relaxed text-sm lg:text-base">{currentQuestion.explanation}</p>
                    </div>
                  </motion.div>
                  
                  <div className="flex justify-end">
                    <button
                      onClick={handleNextQuestion}
                      disabled={isFinishing}
                      className="py-4 px-10 rounded-full font-bold text-lg bg-white text-dark-bg hover:bg-gray-200 transition-all flex items-center justify-center space-x-2 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] hover:-translate-y-1"
                    >
                      {isFinishing ? (
                         <div className="w-5 h-5 border-2 border-dark-bg/20 border-t-dark-bg rounded-full animate-spin" />
                      ) : (
                        <>
                          <span>{currentQuestionIndex < DEMO_QUIZ.questions.length - 1 ? 'Next Question' : 'View Results'}</span>
                          <ArrowRight size={20} />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default QuizTaker;
