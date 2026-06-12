import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Award, Zap, Star, Shield, ExternalLink, ArrowLeft } from 'lucide-react';
import api from '../services/api';

const PublicProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get(`/auth/public/${id}`);
        setProfile(response.data);
        setLoading(false);
      } catch (err) {
        setError('Profile not found or is private.');
        setLoading(false);
      }
    };
    fetchProfile();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-brand-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen bg-dark-bg flex flex-col items-center justify-center text-center p-6">
        <h2 className="text-3xl font-bold text-white mb-4">Oops!</h2>
        <p className="text-dark-muted mb-8">{error}</p>
        <Link to="/register" className="bg-brand-primary text-white px-6 py-3 rounded-full font-bold">
          Join Selfcomfy
        </Link>
      </div>
    );
  }

  const badges = [
    { title: 'First Quiz Passed', icon: Star, color: 'text-yellow-500', bg: 'bg-yellow-500/10', unlocked: profile.quizzesTaken >= 1 },
    { title: 'Perfect Score', icon: Shield, color: 'text-emerald-500', bg: 'bg-emerald-500/10', unlocked: profile.accuracy === 100 },
    { title: '7-Day Streak', icon: Zap, color: 'text-orange-500', bg: 'bg-orange-500/10', unlocked: profile.streak >= 7 },
    { title: 'Top 1% Rank', icon: Award, color: 'text-purple-500', bg: 'bg-purple-500/10', unlocked: profile.xp > 5000 },
  ];

  return (
    <div className="min-h-screen bg-dark-bg text-dark-text py-12 px-4 sm:px-6 relative overflow-hidden font-sans">
      {/* Abstract Background Effects */}
      <div className="fixed top-0 right-0 w-[800px] h-[800px] bg-brand-primary/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen -translate-y-1/2 translate-x-1/3" />
      <div className="fixed bottom-0 left-0 w-[600px] h-[600px] bg-brand-secondary/10 rounded-full blur-[100px] pointer-events-none mix-blend-screen translate-y-1/2 -translate-x-1/4" />

      <div className="max-w-4xl mx-auto relative z-10 space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <Link to="/" className="flex items-center space-x-2 text-dark-muted hover:text-white transition-colors">
            <ArrowLeft size={20} />
            <span className="font-medium">Selfcomfy Home</span>
          </Link>
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-primary to-brand-secondary flex items-center justify-center mr-3 shadow-[0_0_20px_rgba(91,140,255,0.4)]">
              <span className="text-white font-bold text-lg leading-none">S</span>
            </div>
            <h1 className="text-xl font-bold tracking-tight text-white">Selfcomfy</h1>
          </div>
        </div>

        {/* Profile Card */}
        <div className="bg-dark-card/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-dark-surface border-4 border-brand-primary flex items-center justify-center text-white text-5xl font-bold shadow-[0_0_30px_rgba(91,140,255,0.3)]">
                {profile.name.charAt(0).toUpperCase()}
              </div>
              <div className="absolute -bottom-2 right-2 bg-brand-secondary text-white text-xs font-bold px-3 py-1 rounded-full border-2 border-dark-card shadow-lg">
                Level {Math.floor(profile.xp / 1000) + 1}
              </div>
            </div>

            <div className="flex-1 text-center md:text-left space-y-4">
              <div>
                <h2 className="text-4xl font-black text-white mb-2">{profile.name}</h2>
                <p className="text-brand-primary font-medium">{profile.branch || 'B.Tech Student'}</p>
              </div>

              <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-4">
                <div className="bg-dark-surface border border-white/5 px-4 py-3 rounded-2xl">
                  <p className="text-xs text-dark-muted mb-1">Total XP</p>
                  <p className="text-xl font-bold text-white flex items-center gap-1.5">
                    {profile.xp.toLocaleString()} <Zap className="text-semantic-warning" size={16} />
                  </p>
                </div>
                <div className="bg-dark-surface border border-white/5 px-4 py-3 rounded-2xl">
                  <p className="text-xs text-dark-muted mb-1">Current Streak</p>
                  <p className="text-xl font-bold text-white flex items-center gap-1.5">
                    {profile.streak} Days <Flame className="text-orange-500" size={16} />
                  </p>
                </div>
                <div className="bg-dark-surface border border-white/5 px-4 py-3 rounded-2xl">
                  <p className="text-xs text-dark-muted mb-1">Accuracy</p>
                  <p className="text-xl font-bold text-white flex items-center gap-1.5">
                    {profile.accuracy}% <Target className="text-brand-secondary" size={16} />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Badges Section */}
        <div>
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Award className="text-brand-primary" size={24} />
            Public Achievements
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {badges.map((badge) => (
              <div 
                key={badge.title} 
                className={`bg-dark-surface/50 border border-white/5 rounded-2xl p-6 flex flex-col items-center justify-center text-center space-y-4 transition-all ${badge.unlocked ? '' : 'opacity-40 grayscale'}`}
              >
                <div className={`p-4 rounded-full ${badge.bg}`}>
                  <badge.icon className={badge.color} size={32} />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">{badge.title}</h3>
                  <p className="text-xs text-dark-muted mt-1">{badge.unlocked ? 'Unlocked' : 'Locked'}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 bg-gradient-to-r from-brand-primary/20 to-brand-secondary/20 border border-brand-primary/30 rounded-3xl p-8 text-center flex flex-col items-center justify-center">
          <h3 className="text-2xl font-bold text-white mb-3">Want to challenge {profile.name.split(' ')[0]}?</h3>
          <p className="text-dark-muted mb-6 max-w-md">Join Selfcomfy for free to start taking quizzes, earning badges, and climbing the global B.Tech leaderboard.</p>
          <Link to="/register" className="bg-white text-brand-primary hover:bg-gray-100 px-8 py-3 rounded-full font-bold shadow-xl transition-all hover:scale-105 flex items-center gap-2">
            Create Free Account <ExternalLink size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
};

// Lucide React Icons imports needed
import { Flame, Target } from 'lucide-react';

export default PublicProfile;
