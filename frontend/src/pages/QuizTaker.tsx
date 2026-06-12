import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, ArrowRight, Award, Flame } from 'lucide-react';
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

  const currentQuestion = DEMO_QUIZ.questions[currentQuestionIndex];
  const isCorrect = selectedOption === currentQuestion.correctAnswer;

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
      }
      
      setShowResults(true);
    }
  };

  if (showResults) {
    const percentage = Math.round((score / DEMO_QUIZ.questions.length) * 100);
    const passed = percentage >= 60;
    
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl mx-auto mt-10 bg-dark-card border border-gray-800 rounded-3xl p-10 text-center shadow-2xl"
      >
        <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-6 shadow-lg ${passed ? 'bg-gradient-to-br from-emerald-400 to-emerald-600' : 'bg-gradient-to-br from-red-400 to-red-600'}`}>
          {passed ? <Award className="text-white" size={48} /> : <XCircle className="text-white" size={48} />}
        </div>
        
        <h2 className="text-3xl font-bold text-white mb-2">{passed ? 'Quiz Passed!' : 'Needs Improvement'}</h2>
        <p className="text-gray-400 mb-8">You scored {score} out of {DEMO_QUIZ.questions.length} ({percentage}%)</p>
        
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-gray-800/50 rounded-2xl p-4 border border-gray-700/50">
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">XP Earned</p>
            <p className="text-2xl font-bold text-yellow-500 flex items-center justify-center gap-2">
              +{score * 50} <Flame size={20} />
            </p>
          </div>
          <div className="bg-gray-800/50 rounded-2xl p-4 border border-gray-700/50">
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Accuracy</p>
            <p className="text-2xl font-bold text-emerald-400">{percentage}%</p>
          </div>
        </div>

        <button 
          onClick={() => navigate('/dashboard')}
          className="bg-primary-600 hover:bg-primary-500 text-white px-8 py-3 rounded-xl font-bold transition-all w-full"
        >
          Return to Dashboard
        </button>
      </motion.div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Progress Header */}
      <div className="bg-dark-card border border-gray-800 rounded-2xl p-6 flex items-center justify-between shadow-lg">
        <div>
          <h2 className="text-xl font-bold text-white">{DEMO_QUIZ.title}</h2>
          <p className="text-sm text-gray-400">Question {currentQuestionIndex + 1} of {DEMO_QUIZ.questions.length}</p>
        </div>
        <div className="w-1/3 h-3 bg-gray-800 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-primary-500"
            initial={{ width: 0 }}
            animate={{ width: `${((currentQuestionIndex) / DEMO_QUIZ.questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <motion.div 
        key={currentQuestionIndex}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-dark-card border border-gray-800 rounded-3xl p-8 shadow-xl"
      >
        <h3 className="text-2xl font-semibold text-white mb-8 leading-relaxed">
          {currentQuestion.text}
        </h3>

        <div className="space-y-4">
          {currentQuestion.options.map((option, index) => {
            const isSelected = selectedOption === index;
            const isCorrectOption = index === currentQuestion.correctAnswer;
            
            let buttonStyle = "border-gray-700 hover:border-primary-500 hover:bg-primary-900/20";
            
            if (isAnswerSubmitted) {
              if (isCorrectOption) {
                buttonStyle = "border-emerald-500 bg-emerald-500/10";
              } else if (isSelected && !isCorrectOption) {
                buttonStyle = "border-red-500 bg-red-500/10";
              } else {
                buttonStyle = "border-gray-800 opacity-50";
              }
            } else if (isSelected) {
              buttonStyle = "border-primary-500 bg-primary-600/20";
            }

            return (
              <button
                key={index}
                onClick={() => handleSelectOption(index)}
                disabled={isAnswerSubmitted}
                className={`w-full text-left p-5 rounded-2xl border-2 transition-all flex justify-between items-center ${buttonStyle}`}
              >
                <span className={`font-medium ${isSelected || isAnswerSubmitted ? 'text-white' : 'text-gray-300'}`}>
                  {option}
                </span>
                
                {isAnswerSubmitted && isCorrectOption && <CheckCircle2 className="text-emerald-500" size={24} />}
                {isAnswerSubmitted && isSelected && !isCorrectOption && <XCircle className="text-red-500" size={24} />}
              </button>
            );
          })}
        </div>

        {/* Action Area */}
        <div className="mt-10 pt-6 border-t border-gray-800">
          {!isAnswerSubmitted ? (
            <button
              onClick={handleSubmitAnswer}
              disabled={selectedOption === null}
              className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
                selectedOption !== null 
                  ? 'bg-primary-600 hover:bg-primary-500 text-white shadow-lg shadow-primary-600/30' 
                  : 'bg-gray-800 text-gray-500 cursor-not-allowed'
              }`}
            >
              Check Answer
            </button>
          ) : (
            <div className="space-y-6">
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-5 rounded-2xl border ${isCorrect ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-red-500/10 border-red-500/30'}`}
              >
                <h4 className={`font-bold mb-2 ${isCorrect ? 'text-emerald-400' : 'text-red-400'}`}>
                  {isCorrect ? 'Awesome! That is correct.' : 'Not quite right.'}
                </h4>
                <p className="text-gray-300 text-sm leading-relaxed">{currentQuestion.explanation}</p>
              </motion.div>
              
              <button
                onClick={handleNextQuestion}
                className="w-full py-4 rounded-xl font-bold text-lg bg-white text-black hover:bg-gray-200 transition-all flex items-center justify-center space-x-2"
              >
                <span>{currentQuestionIndex < DEMO_QUIZ.questions.length - 1 ? 'Next Question' : 'View Results'}</span>
                <ArrowRight size={20} />
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default QuizTaker;
