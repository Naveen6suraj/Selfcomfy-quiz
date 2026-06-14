import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Zap, Lock, ArrowRight, Loader } from 'lucide-react';
import api from '../services/api';

const ResetPassword = () => {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);
    setMessage('');
    setError('');

    try {
      const response = await api.post(`/auth/reset-password/${token}`, { password });
      setMessage(response.data.message || 'Password reset successful!');
      setTimeout(() => navigate('/login'), 3000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-surface-dark relative flex-col justify-between p-12 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/20 via-transparent to-brand-accent/20" />
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
        </div>

        <div className="relative z-10">
          <div className="flex items-center space-x-3 text-white mb-12">
            <div className="w-10 h-10 rounded-xl bg-brand-primary flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold tracking-tight">AntiGravity</span>
          </div>
          
          <div className="max-w-md">
            <h1 className="text-5xl font-bold text-white leading-tight mb-6">
              Create New Password
            </h1>
            <p className="text-lg text-white/70 leading-relaxed">
              Your new password must be different from previous used passwords.
            </p>
          </div>
        </div>

        <div className="relative z-10 flex items-center space-x-4">
          <div className="flex -space-x-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-12 h-12 rounded-full border-2 border-surface-dark bg-surface-light flex items-center justify-center overflow-hidden">
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i+10}`} alt="Avatar" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
          <div className="text-sm text-white/70">
            <span className="font-semibold text-white">Securely</span><br />
            updating your credentials
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24 bg-white relative">
        <div className="mx-auto w-full max-w-sm lg:w-[400px]">
          <div className="text-center lg:text-left mb-10">
            <div className="lg:hidden flex items-center justify-center space-x-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-brand-primary flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-text-primary tracking-tight">AntiGravity</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-text-primary mb-2">
              Set New Password
            </h2>
            <p className="text-text-secondary text-sm">
              Please enter your new password below.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1">
              <label htmlFor="password" className="block text-sm font-medium text-text-primary">
                New Password
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-text-muted group-focus-within:text-brand-primary transition-colors" />
                </div>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all sm:text-sm bg-gray-50/50"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-text-primary">
                Confirm Password
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-text-muted group-focus-within:text-brand-primary transition-colors" />
                </div>
                <input
                  id="confirmPassword"
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all sm:text-sm bg-gray-50/50"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-50 text-red-500 text-sm rounded-lg border border-red-100 flex items-start">
                <span className="block sm:inline">{error}</span>
              </div>
            )}

            {message && (
              <div className="p-4 bg-green-50 text-green-700 text-sm rounded-lg border border-green-200 flex flex-col space-y-2">
                <span className="block sm:inline">{message}</span>
                <span className="text-xs">Redirecting to login...</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-xl text-white bg-brand-primary hover:bg-brand-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-brand-primary/25"
            >
              {isLoading ? (
                <Loader className="w-5 h-5 animate-spin" />
              ) : (
                <span className="flex items-center">
                  Reset Password
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </span>
              )}
            </button>

            <div className="text-center pt-4">
              <Link to="/login" className="text-sm font-semibold text-brand-primary hover:text-brand-accent transition-colors">
                Back to Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
