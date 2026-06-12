import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Lock, Eye, EyeOff, ArrowRight, Loader2, AlertCircle, BookOpen, ChevronRight } from 'lucide-react';
import api from '../services/api';
import { loginSuccess } from '../store/slices/authSlice';

const branches = [
  'Computer Science Engineering (CSE)',
  'Information Technology (IT)',
  'Electronics & Comm.',
  'Mechanical Engineering',
  'Civil Engineering'
];

const Register: React.FC = () => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [branch, setBranch] = useState(branches[0]);
  const [showPassword, setShowPassword] = useState(false);
  
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleNextStep = () => {
    if (step === 1) {
      if (!name || !email || !password) {
        setError('Please fill in all fields to continue.');
        return;
      }
      if (password.length < 6) {
        setError('Password must be at least 6 characters.');
        return;
      }
    }
    setError('');
    setStep(2);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const response = await api.post('/auth/register', { name, email, password, branch });
      dispatch(loginSuccess(response.data));
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg text-dark-text flex flex-col md:flex-row font-sans overflow-hidden">
      
      {/* Left Branding/Hero Section */}
      <div className="hidden md:flex flex-1 relative items-center justify-center p-12 overflow-hidden bg-dark-sidebar/50">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-brand-secondary/20 rounded-full blur-[100px] mix-blend-screen pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-brand-primary/20 rounded-full blur-[100px] mix-blend-screen pointer-events-none" />
        
        <div className="relative z-10 max-w-lg">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-primary to-brand-secondary flex items-center justify-center shadow-[0_0_30px_rgba(91,140,255,0.4)]">
                <span className="text-white font-bold text-2xl leading-none">S</span>
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-white">Selfcomfy</h1>
            </div>
            <h2 className="text-5xl font-black text-white leading-tight mb-6">
              Accelerate your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-secondary to-brand-accent">
                Career Growth
              </span>
            </h2>
            <div className="space-y-4 mt-8">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                  <BookOpen size={20} />
                </div>
                <p className="text-dark-muted font-medium">Branch-specific tailored learning</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-semantic-warning/10 flex items-center justify-center text-semantic-warning">
                  <ArrowRight size={20} />
                </div>
                <p className="text-dark-muted font-medium">Gamified progress tracking</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right Registration Section */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 relative z-10">
        <div className="absolute top-0 right-0 w-full h-full bg-brand-secondary/5 blur-[100px] pointer-events-none md:hidden" />
        
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full max-w-md glass-card p-8 sm:p-10 rounded-3xl"
        >
          <div className="mb-8">
            <h3 className="text-3xl font-bold text-white mb-2">Create Account</h3>
            <div className="flex items-center gap-2 mt-2">
              <div className={`h-1.5 rounded-full flex-1 transition-all duration-300 ${step >= 1 ? 'bg-brand-primary' : 'bg-white/10'}`} />
              <div className={`h-1.5 rounded-full flex-1 transition-all duration-300 ${step >= 2 ? 'bg-brand-primary' : 'bg-white/10'}`} />
            </div>
            <p className="text-dark-muted mt-3 text-sm">
              {step === 1 ? 'Step 1: Your details' : 'Step 2: Your academic profile'}
            </p>
          </div>

          <AnimatePresence mode="wait">
            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                animate={{ opacity: 1, height: 'auto', marginBottom: 24 }}
                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                className="bg-semantic-danger/10 border border-semantic-danger/30 rounded-xl p-4 flex items-start gap-3"
              >
                <AlertCircle className="text-semantic-danger shrink-0 mt-0.5" size={18} />
                <p className="text-sm text-red-200">{error}</p>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={step === 2 ? handleRegister : (e) => { e.preventDefault(); handleNextStep(); }} className="space-y-5">
            
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-5"
                >
                  {/* Name Field */}
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-dark-muted group-focus-within:text-brand-primary transition-colors">
                      <User size={18} />
                    </div>
                    <input 
                      type="text" 
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="input-premium w-full pl-11 pr-4 py-3.5 rounded-xl text-sm peer placeholder-transparent"
                      placeholder="Full Name"
                    />
                    <label 
                      htmlFor="name"
                      className="absolute left-11 -top-2.5 bg-[#0e1628] px-1 text-xs font-semibold text-dark-muted transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:text-dark-muted peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-brand-primary"
                    >
                      Full Name
                    </label>
                  </div>

                  {/* Email Field */}
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-dark-muted group-focus-within:text-brand-primary transition-colors">
                      <Mail size={18} />
                    </div>
                    <input 
                      type="email" 
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="input-premium w-full pl-11 pr-4 py-3.5 rounded-xl text-sm peer placeholder-transparent"
                      placeholder="Email Address"
                    />
                    <label 
                      htmlFor="email"
                      className="absolute left-11 -top-2.5 bg-[#0e1628] px-1 text-xs font-semibold text-dark-muted transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:text-dark-muted peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-brand-primary"
                    >
                      Email Address
                    </label>
                  </div>

                  {/* Password Field */}
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-dark-muted group-focus-within:text-brand-primary transition-colors">
                      <Lock size={18} />
                    </div>
                    <input 
                      type={showPassword ? "text" : "password"} 
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="input-premium w-full pl-11 pr-12 py-3.5 rounded-xl text-sm peer placeholder-transparent"
                      placeholder="Password"
                    />
                    <label 
                      htmlFor="password"
                      className="absolute left-11 -top-2.5 bg-[#0e1628] px-1 text-xs font-semibold text-dark-muted transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:text-dark-muted peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-brand-primary"
                    >
                      Password
                    </label>
                    <button 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-dark-muted hover:text-white transition-colors"
                      tabIndex={-1}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>

                  <button 
                    type="button"
                    onClick={handleNextStep}
                    className="group w-full flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold py-3.5 rounded-xl transition-all duration-300 mt-6"
                  >
                    Continue
                    <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <label className="block text-sm font-semibold text-white mb-2">Select your Branch</label>
                  <div className="grid grid-cols-1 gap-3 max-h-[250px] overflow-y-auto pr-2 custom-scrollbar">
                    {branches.map((b) => (
                      <div 
                        key={b}
                        onClick={() => setBranch(b)}
                        className={`p-4 rounded-xl border cursor-pointer transition-all ${branch === b ? 'bg-brand-primary/20 border-brand-primary shadow-[0_0_15px_rgba(91,140,255,0.2)]' : 'bg-dark-surface border-white/5 hover:border-white/20'}`}
                      >
                        <div className="flex items-center justify-between">
                          <span className={`text-sm font-medium ${branch === b ? 'text-white' : 'text-dark-muted'}`}>{b}</span>
                          {branch === b && (
                            <div className="w-4 h-4 rounded-full bg-brand-primary flex items-center justify-center">
                              <div className="w-1.5 h-1.5 bg-white rounded-full" />
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button 
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-6 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-medium transition-colors border border-white/5"
                    >
                      Back
                    </button>
                    <button 
                      type="submit"
                      disabled={isLoading}
                      className="flex-1 group flex items-center justify-center gap-2 bg-gradient-to-r from-brand-primary to-brand-secondary hover:from-brand-secondary hover:to-brand-accent text-white font-bold py-3.5 rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(91,140,255,0.3)] hover:shadow-[0_0_30px_rgba(91,140,255,0.5)] disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <Loader2 className="animate-spin" size={20} />
                      ) : (
                        'Create Account'
                      )}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </form>
          
          <div className="mt-8 pt-6 border-t border-white/10 text-center text-sm text-dark-muted">
            Already have an account?{' '}
            <Link to="/login" className="font-bold text-white hover:text-brand-accent transition-colors">
              Sign in
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
