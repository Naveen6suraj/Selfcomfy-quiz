import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import api from '../services/api';
import { loginSuccess } from '../store/slices/authSlice';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const response = await api.post('/auth/login', { email, password });
      dispatch(loginSuccess(response.data));
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg text-dark-text flex flex-col md:flex-row font-sans overflow-hidden">
      
      {/* Left Branding/Hero Section - Hidden on small screens */}
      <div className="hidden md:flex flex-1 relative items-center justify-center p-12 overflow-hidden bg-dark-sidebar/50">
        {/* Abstract Background Elements */}
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-brand-primary/20 rounded-full blur-[100px] mix-blend-screen pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-brand-secondary/20 rounded-full blur-[100px] mix-blend-screen pointer-events-none" />
        
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
              Master your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-accent">
                Engineering Journey
              </span>
            </h2>
            <p className="text-lg text-dark-muted leading-relaxed">
              Join thousands of B.Tech students competing, learning, and preparing for top-tier placements on the ultimate EdTech platform.
            </p>
          </motion.div>
          
          {/* Floating UI Elements for depth */}
          <motion.div 
            animate={{ y: [0, -10, 0] }} 
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            className="absolute -right-12 top-10 glass-card p-4 rounded-2xl flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-full bg-semantic-success/20 flex items-center justify-center">
              <span className="text-semantic-success font-bold">+150 XP</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right Login Section */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 relative z-10">
        {/* Mobile Background Elements */}
        <div className="absolute top-0 right-0 w-full h-full bg-brand-primary/5 blur-[100px] pointer-events-none md:hidden" />
        
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full max-w-md glass-card p-8 sm:p-10 rounded-3xl"
        >
          <div className="mb-8">
            <h3 className="text-3xl font-bold text-white mb-2">Welcome back</h3>
            <p className="text-dark-muted">Log in to continue your progress.</p>
          </div>

          <AnimatePresence>
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

          <form onSubmit={handleLogin} className="space-y-5">
            
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
                required
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
                required
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

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer group">
                <div className="relative flex items-center justify-center w-4 h-4">
                  <input 
                    type="checkbox" 
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="peer sr-only" 
                  />
                  <div className="w-4 h-4 border border-dark-muted rounded bg-dark-bg peer-checked:bg-brand-primary peer-checked:border-brand-primary transition-colors"></div>
                  <svg className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                <span className="text-sm text-dark-muted group-hover:text-gray-300 transition-colors">Remember me</span>
              </label>
              
              <Link to="/forgot-password" className="text-sm font-semibold text-brand-primary hover:text-brand-accent transition-colors">
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <button 
              type="submit"
              disabled={isLoading}
              className="group w-full flex items-center justify-center gap-2 bg-gradient-to-r from-brand-primary to-brand-secondary hover:from-brand-secondary hover:to-brand-accent text-white font-bold py-3.5 rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(91,140,255,0.3)] hover:shadow-[0_0_30px_rgba(91,140,255,0.5)] disabled:opacity-70 disabled:cursor-not-allowed mt-4"
            >
              {isLoading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>
                  Sign In
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
          
          <div className="mt-8 pt-6 border-t border-white/10 text-center text-sm text-dark-muted">
            Don't have an account?{' '}
            <Link to="/register" className="font-bold text-white hover:text-brand-accent transition-colors">
              Create an account
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
