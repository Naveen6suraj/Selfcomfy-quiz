import React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';

// Importing the new premium dashboard components
import HeroSection from '../components/dashboard/HeroSection';
import StatsGrid from '../components/dashboard/StatsGrid';
import LearningProgress from '../components/dashboard/LearningProgress';
import AIRecommendations from '../components/dashboard/AIRecommendations';
import RecentActivity from '../components/dashboard/RecentActivity';
import LeaderboardWidget from '../components/dashboard/LeaderboardWidget';
import DailyGoals from '../components/dashboard/DailyGoals';

const StudentDashboard: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto pb-12 relative">
      {/* 1. Personalized Hero Section */}
      <HeroSection user={user} />

      {/* 2. Interactive Statistics Grid */}
      <StatsGrid user={user} />

      {/* 3. Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column (Main Focus) */}
        <div className="lg:col-span-8 space-y-6">
          <AIRecommendations />
          <RecentActivity />
          <LearningProgress />
        </div>

        {/* Right Column (Widgets & Social Proof) */}
        <div className="lg:col-span-4 space-y-6">
          <DailyGoals />
          <LeaderboardWidget />
        </div>

      </div>
    </div>
  );
};

export default StudentDashboard;
