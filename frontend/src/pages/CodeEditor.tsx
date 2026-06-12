import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, CheckCircle2, XCircle, ArrowLeft, Terminal, Layout } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateUser } from '../store/slices/authSlice';
import api from '../services/api';

const PROBLEM_DATA = {
  title: 'Two Sum',
  difficulty: 'Easy',
  xpReward: 250,
  description: `Given an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers such that they add up to \`target\`.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`,
  examples: [
    { input: 'nums = [2,7,11,15], target = 9', output: '[0,1]', explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].' },
    { input: 'nums = [3,2,4], target = 6', output: '[1,2]', explanation: '' }
  ],
  constraints: [
    '2 <= nums.length <= 10^4',
    '-10^9 <= nums[i] <= 10^9',
    '-10^9 <= target <= 10^9',
    'Only one valid answer exists.'
  ],
  starterCode: `function twoSum(nums, target) {
    // Write your code here
    
};`
};

const CodeEditor: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [code, setCode] = useState(PROBLEM_DATA.starterCode);
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState<{ status: 'idle' | 'success' | 'error', message: string }>({ status: 'idle', message: '' });

  const handleRunCode = () => {
    setIsRunning(true);
    setOutput({ status: 'idle', message: 'Running test cases...' });
    
    // Simulate compilation and test case execution
    setTimeout(() => {
      setIsRunning(false);
      if (code.includes('return') || code.length > PROBLEM_DATA.starterCode.length + 10) {
        setOutput({ 
          status: 'success', 
          message: 'All test cases passed!\nRuntime: 54ms\nMemory: 42.3MB\n\nSubmitting results...' 
        });
        
        // Sync progress
        submitProgress();
      } else {
        setOutput({ 
          status: 'error', 
          message: 'Test Case 1 Failed:\nInput: nums = [2,7,11,15], target = 9\nExpected: [0,1]\nOutput: undefined' 
        });
      }
    }, 1500);
  };

  const submitProgress = async () => {
    try {
      const { data } = await api.put('/auth/progress', {
        xpEarned: PROBLEM_DATA.xpReward,
        scorePercentage: 100 // Coding challenges give 100% accuracy if solved
      });
      setTimeout(() => {
        dispatch(updateUser(data));
      }, 1000);
    } catch (error) {
      console.error('Failed to sync progress:', error);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-dark-bg text-dark-text font-sans">
      {/* Navbar */}
      <header className="h-16 border-b border-white/5 bg-dark-sidebar/90 backdrop-blur-md px-6 flex items-center justify-between z-10 relative">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/dashboard/practice')}
            className="p-2 hover:bg-white/5 rounded-lg transition-colors text-dark-muted hover:text-white"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="flex items-center gap-3">
            <div className="p-1.5 bg-brand-primary/10 rounded-md">
              <Layout className="text-brand-primary" size={16} />
            </div>
            <h1 className="font-bold text-white text-lg">{PROBLEM_DATA.title}</h1>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider bg-semantic-success/10 text-semantic-success border border-semantic-success/20">
              {PROBLEM_DATA.difficulty}
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={handleRunCode}
            disabled={isRunning}
            className={`flex items-center gap-2 px-6 py-2 rounded-lg font-semibold text-sm transition-all shadow-lg ${
              isRunning 
                ? 'bg-dark-surface text-dark-muted cursor-not-allowed' 
                : 'bg-brand-primary hover:bg-brand-primary/90 text-white shadow-[0_0_15px_rgba(91,140,255,0.2)] hover:shadow-[0_0_20px_rgba(91,140,255,0.4)]'
            }`}
          >
            {isRunning ? (
              <div className="w-4 h-4 border-2 border-dark-muted border-t-transparent rounded-full animate-spin" />
            ) : (
              <Play size={16} fill="currentColor" />
            )}
            <span>{isRunning ? 'Running...' : 'Run & Submit'}</span>
          </button>
        </div>
      </header>

      {/* Split Pane Container */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Pane: Problem Description */}
        <div className="w-1/2 border-r border-white/5 bg-dark-bg flex flex-col overflow-y-auto custom-scrollbar">
          <div className="p-8 space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Description</h2>
              <div className="text-dark-muted whitespace-pre-wrap leading-relaxed">
                {PROBLEM_DATA.description}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white">Examples</h3>
              {PROBLEM_DATA.examples.map((ex, i) => (
                <div key={i} className="bg-dark-surface/50 border border-white/5 rounded-xl p-4 space-y-2">
                  <p className="font-mono text-sm text-brand-accent"><span className="text-dark-muted select-none">Input:</span> {ex.input}</p>
                  <p className="font-mono text-sm text-semantic-success"><span className="text-dark-muted select-none">Output:</span> {ex.output}</p>
                  {ex.explanation && (
                    <p className="text-sm text-dark-muted"><span className="font-semibold text-white select-none">Explanation:</span> {ex.explanation}</p>
                  )}
                </div>
              ))}
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-4">Constraints</h3>
              <ul className="list-disc list-inside space-y-2 text-dark-muted font-mono text-sm bg-dark-surface/30 p-4 rounded-xl border border-white/5">
                {PROBLEM_DATA.constraints.map((c, i) => <li key={i}>{c}</li>)}
              </ul>
            </div>
          </div>
        </div>

        {/* Right Pane: Code Editor & Console */}
        <div className="w-1/2 flex flex-col bg-[#0d1117]">
          {/* Editor Area */}
          <div className="flex-1 relative flex flex-col">
            <div className="h-10 bg-dark-surface border-b border-white/5 flex items-center px-4 gap-2 text-xs font-mono text-dark-muted">
              <span className="text-brand-primary">solution.js</span>
            </div>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              spellCheck="false"
              className="flex-1 w-full bg-transparent text-gray-300 p-4 font-mono text-sm leading-relaxed resize-none focus:outline-none custom-scrollbar"
            />
          </div>

          {/* Console Area */}
          <div className="h-64 border-t border-white/5 bg-dark-sidebar flex flex-col">
            <div className="h-10 bg-dark-surface border-b border-white/5 flex items-center px-4 gap-2 text-xs font-semibold text-white">
              <Terminal size={14} className="text-dark-muted" />
              <span>Console Output</span>
            </div>
            <div className="flex-1 p-4 font-mono text-sm overflow-y-auto custom-scrollbar whitespace-pre-wrap">
              {output.status === 'idle' && (
                <span className="text-dark-muted">{output.message || 'Run your code to see output here.'}</span>
              )}
              {output.status === 'success' && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-semantic-success font-bold text-base">
                    <CheckCircle2 size={18} />
                    <span>Accepted</span>
                  </div>
                  <div className="text-gray-300 bg-semantic-success/10 p-3 rounded-lg border border-semantic-success/20">
                    {output.message}
                  </div>
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-brand-primary/20 text-brand-primary rounded-full border border-brand-primary/30"
                  >
                    <span className="font-bold">+{PROBLEM_DATA.xpReward} XP Earned!</span>
                    <button onClick={() => navigate('/dashboard')} className="underline hover:text-white ml-2 text-xs">Return to Dashboard</button>
                  </motion.div>
                </div>
              )}
              {output.status === 'error' && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-semantic-danger font-bold text-base">
                    <XCircle size={18} />
                    <span>Wrong Answer</span>
                  </div>
                  <div className="text-semantic-danger bg-semantic-danger/10 p-3 rounded-lg border border-semantic-danger/20">
                    {output.message}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
