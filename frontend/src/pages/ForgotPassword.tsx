import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Zap, Mail, ArrowRight, Loader } from 'lucide-react';
import api from '../services/api';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [resetToken, setResetToken] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    setError('');
    setResetToken('');

    try {
      const response = await api.post('/auth/forgot-password', { email });
      setMessage(response.data.data);
      if (response.data.resetToken) {
        setResetToken(response.data.resetToken);
      }
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
              Forgot Your Password?
            </h1>
            <p className="text-lg text-white/70 leading-relaxed">
              Don't worry, it happens. Enter your email address and we'll send you a link to reset your password.
            </p>
          </div>
        </div>

        <div className="relative z-10 flex items-center space-x-4">
          <div className="flex -space-x-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-12 h-12 rounded-full border-2 border-surface-dark bg-surface-light flex items-center justify-center overflow-hidden">
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`} alt="Avatar" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
          <div className="text-sm text-white/70">
            <span className="font-semibold text-white">Join 10,000+</span><br />
            students recovering access
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24 bg-dark-bg text-dark-text relative">
        <div className="mx-auto w-full max-w-sm lg:w-[400px]">
          <div className="text-center lg:text-left mb-10">
            <div className="lg:hidden flex items-center justify-center space-x-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-brand-primary flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-text-primary tracking-tight">AntiGravity</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-white mb-2">
              Reset Password
            </h2>
            <p className="text-dark-muted text-sm">
              Enter your email to receive a reset link.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1">
              <label htmlFor="email" className="block text-sm font-medium text-white">
                Email address
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-text-muted group-focus-within:text-brand-primary transition-colors" />
                </div>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-premium w-full pl-10 pr-3 py-3 rounded-xl text-white placeholder-dark-muted focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all sm:text-sm bg-[#0e1628]"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-50 text-red-500 text-sm rounded-lg border border-red-100 flex items-start">
                <span className="block sm:inline">{error}</span>
              </div>
            )}

            {message && (
              <div className="p-4 bg-green-50 text-green-700 text-sm rounded-lg border border-green-200 flex flex-col space-y-3">
                <span className="block sm:inline">{message}</span>
                {resetToken && (
                  <div className="bg-white p-3 rounded border border-green-100 break-all text-xs">
                    <p className="font-semibold mb-1">MOCKED EMAIL LINK:</p>
                    <Link to={`/reset-password/${resetToken}`} className="text-brand-primary hover:underline">
                      Click here to reset your password (Token: {resetToken})
                    </Link>
                  </div>
                )}
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
                  Send Reset Link
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

export default ForgotPassword;
