import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Outlet } from 'react-router-dom';
import type { RootState } from '../store/store';
import { logout } from '../store/slices/authSlice';
import { LogOut, LayoutDashboard, BookOpen, PenTool, Users, Award, Search, X, Menu } from 'lucide-react';

const searchDatabase = [
  { id: 1, title: 'Data Structures Fundamentals', type: 'Quiz', path: '/dashboard/quiz/demo-1', icon: PenTool },
  { id: 2, title: 'Advanced Algorithms', type: 'Course', path: '/dashboard/practice', icon: BookOpen },
  { id: 3, title: 'Global Leaderboard', type: 'Social', path: '/dashboard/achievements', icon: Award },
  { id: 4, title: 'My Learning Analytics', type: 'Stats', path: '/dashboard/achievements', icon: LayoutDashboard },
  { id: 5, title: 'User Settings', type: 'Profile', path: '/dashboard', icon: Users },
  { id: 6, title: 'HTML & CSS Design', type: 'Course', path: '/dashboard/course/html-css', icon: BookOpen },
  { id: 7, title: 'Python Programming Masterclass', type: 'Course', path: '/dashboard/course/python', icon: BookOpen },
  { id: 8, title: 'Python Web Scraping', type: 'Project', path: '/dashboard/course/python', icon: PenTool },
  { id: 9, title: 'React for Beginners', type: 'Course', path: '/dashboard/course/javascript', icon: BookOpen },
  { id: 10, title: 'JavaScript Fundamentals', type: 'Quiz', path: '/dashboard/course/javascript', icon: PenTool },
  { id: 11, title: 'Java & OOP', type: 'Course', path: '/dashboard/course/java', icon: BookOpen },
  { id: 12, title: 'HTML & CSS Design', type: 'Course', path: '/dashboard/course/html-css', icon: BookOpen },
  { id: 13, title: 'Bash & Shell Scripting', type: 'Course', path: '/dashboard/course/bash', icon: BookOpen },
  { id: 14, title: 'C++ Systems Programming', type: 'Course', path: '/dashboard/course/cpp', icon: BookOpen },
];

const DashboardLayout: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isQuickActionOpen, setIsQuickActionOpen] = useState(false);
  
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Achievement Unlocked!', desc: "You earned the 'First Quiz Passed' badge.", time: '2 hours ago', icon: Award, color: 'text-brand-primary', bg: 'bg-brand-primary/20', read: false },
    { id: 2, title: 'New Course Available', desc: 'Civil Engineering courses are now live.', time: '1 day ago', icon: BookOpen, color: 'text-brand-secondary', bg: 'bg-brand-secondary/20', read: false }
  ]);
  const unreadCount = notifications.filter(n => !n.read).length;
  const searchRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const quickRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (searchRef.current && !searchRef.current.contains(target)) setIsSearchOpen(false);
      if (notifRef.current && !notifRef.current.contains(target)) setIsNotificationsOpen(false);
      if (quickRef.current && !quickRef.current.contains(target)) setIsQuickActionOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const navItems = user?.role === 'admin' 
    ? [
        { label: 'Overview', icon: LayoutDashboard, path: '/dashboard' },
        { label: 'Subjects', icon: BookOpen, path: '/dashboard/subjects' },
        { label: 'Quizzes', icon: PenTool, path: '/dashboard/quizzes' },
        { label: 'Users', icon: Users, path: '/dashboard/users' },
      ]
    : [
        { label: 'My Learning', icon: LayoutDashboard, path: '/dashboard' },
        { label: 'Quizzes & Tasks', icon: PenTool, path: '/dashboard/practice' },
        { label: 'Achievements', icon: Award, path: '/dashboard/achievements' },
      ];

  const filteredSearch = searchQuery.trim()
    ? searchDatabase.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase().trim()) || 
        item.type.toLowerCase().includes(searchQuery.toLowerCase().trim())
      )
    : searchDatabase.slice(0, 6); // Show top suggestions when empty

  return (
    <div className="flex h-screen bg-dark-bg text-dark-text overflow-hidden font-sans">
      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Premium Sidebar */}
      <aside className={`fixed inset-y-0 left-0 transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition-transform duration-300 ease-in-out w-64 bg-dark-sidebar/90 backdrop-blur-xl border-r border-white/5 flex flex-col z-50`}>
        <div className="h-20 flex items-center justify-between px-8">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-primary to-brand-secondary flex items-center justify-center mr-3 shadow-[0_0_20px_rgba(91,140,255,0.4)]">
              <span className="text-white font-bold text-lg leading-none">S</span>
            </div>
            <h1 className="text-xl font-bold tracking-tight text-white">Selfcomfy</h1>
          </div>
          <button className="md:hidden text-white/50 hover:text-white" onClick={() => setIsMobileMenuOpen(false)}>
            <X size={20} />
          </button>
        </div>
        
        <nav className="flex-1 py-8 px-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = window.location.pathname === item.path || window.location.pathname.startsWith(item.path + '/');
            return (
              <div 
                key={item.label}
                onClick={() => {
                  navigate(item.path);
                  setIsMobileMenuOpen(false);
                }}
                className={`flex items-center space-x-3 px-4 py-3 rounded-full cursor-pointer transition-all duration-300 group ${
                  isActive 
                    ? 'bg-brand-primary/10 text-brand-primary shadow-[0_0_15px_rgba(91,140,255,0.1)]' 
                    : 'text-dark-muted hover:text-white hover:bg-white/5'
                }`}
              >
                <item.icon size={20} className={isActive ? 'text-brand-primary' : 'group-hover:text-white transition-colors'} />
                <span className="font-semibold text-sm tracking-wide">{item.label}</span>
              </div>
            );
          })}
        </nav>

        {/* User Section in Sidebar */}
        <div className="p-6 border-t border-white/5 bg-gradient-to-t from-dark-bg/50 to-transparent">
          <div className="flex items-center space-x-3 mb-5">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-dark-surface border-2 border-brand-primary flex items-center justify-center text-white font-bold shadow-[0_0_15px_rgba(91,140,255,0.3)]">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <div className="absolute -bottom-1 -right-1 bg-brand-secondary text-[10px] font-bold px-1.5 py-0.5 rounded-full border border-dark-bg">
                Lvl {Math.floor((user?.xp || 0) / 1000) + 1}
              </div>
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-bold text-white truncate">{user?.name}</p>
              <div className="w-full h-1.5 bg-dark-surface rounded-full mt-1.5 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-brand-primary to-brand-accent rounded-full" style={{ width: `${((user?.xp || 0) % 1000) / 10}%` }}></div>
              </div>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center justify-center w-full space-x-2 text-sm font-semibold text-semantic-danger hover:bg-semantic-danger/10 py-2.5 rounded-full transition-all duration-300 border border-transparent hover:border-semantic-danger/20"
          >
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto bg-dark-bg relative w-full md:w-auto">
        {/* Abstract Background Effects */}
        <div className="fixed top-0 right-0 w-[800px] h-[800px] bg-brand-primary/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen -translate-y-1/2 translate-x-1/3" />
        <div className="fixed bottom-0 left-64 w-[600px] h-[600px] bg-brand-secondary/5 rounded-full blur-[100px] pointer-events-none mix-blend-screen translate-y-1/2 -translate-x-1/4 hidden md:block" />

        {/* Floating Top Navbar */}
        <header className="sticky top-0 z-40 bg-dark-bg/60 backdrop-blur-2xl border-b border-white/5 px-4 md:px-8 py-4 md:py-5 flex items-center justify-between">
          <div className="flex-1 max-w-xl flex items-center gap-3">
            <button 
              className="md:hidden text-white/70 hover:text-white transition-colors bg-white/5 p-2 rounded-xl"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={22} />
            </button>
            <div className="relative group w-full" ref={searchRef}>
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsSearchOpen(true);
                }}
                onFocus={() => setIsSearchOpen(true)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && filteredSearch.length > 0) {
                    navigate(filteredSearch[0].path);
                    setIsSearchOpen(false);
                    setSearchQuery('');
                  }
                }}
                placeholder="Search quizzes, courses, or skills..." 
                className="w-full bg-dark-surface/50 border border-white/5 rounded-full pl-12 pr-10 py-2.5 text-sm text-white placeholder-dark-muted focus:outline-none focus:border-brand-primary/50 focus:bg-dark-surface transition-all shadow-inner group-hover:border-white/10"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-muted" size={18} />
              
              {searchQuery && (
                <button 
                  onClick={() => { setSearchQuery(''); setIsSearchOpen(false); }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-dark-muted hover:text-white"
                >
                  <X size={16} />
                </button>
              )}

              {/* Search Dropdown */}
              {isSearchOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-dark-card border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2">
                  {filteredSearch.length > 0 ? (
                    <div className="max-h-80 overflow-y-auto p-2">
                      {!searchQuery && <div className="px-3 py-2 text-xs font-bold text-dark-muted uppercase tracking-wider">Suggested for you</div>}
                      {filteredSearch.map(item => (
                        <div 
                          key={item.id}
                          onMouseDown={(e) => {
                            e.preventDefault();
                            navigate(item.path);
                            setIsSearchOpen(false);
                            setSearchQuery('');
                          }}
                          className="flex items-center space-x-3 p-3 hover:bg-white/5 rounded-xl cursor-pointer transition-colors"
                        >
                          <div className="p-2 bg-dark-surface rounded-lg text-brand-primary">
                            <item.icon size={16} />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-white">{item.title}</p>
                            <p className="text-xs text-dark-muted">{item.type}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-6 text-center text-dark-muted text-sm">
                      No results found for "{searchQuery}"
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-6 ml-6">
            
            {/* Notifications */}
            <div className="relative" ref={notifRef}>
              <button 
                onClick={() => { setIsNotificationsOpen(!isNotificationsOpen); setIsQuickActionOpen(false); }}
                className="text-dark-muted hover:text-white transition-colors relative group"
              >
                {unreadCount > 0 && (
                  <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-semantic-danger rounded-full border-2 border-dark-bg group-hover:scale-110 transition-transform"></div>
                )}
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
              </button>

              {isNotificationsOpen && (
                <div className="absolute top-full right-0 mt-4 w-80 bg-dark-card border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="p-4 border-b border-white/5 flex justify-between items-center bg-dark-surface/50">
                    <h3 className="text-white font-bold">Notifications {unreadCount > 0 && `(${unreadCount})`}</h3>
                    <span 
                      onClick={() => setNotifications(notifications.map(n => ({ ...n, read: true })))}
                      className="text-xs text-brand-primary cursor-pointer hover:underline"
                    >
                      Mark all as read
                    </span>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="p-6 text-center text-dark-muted text-sm">No notifications yet.</div>
                    ) : (
                      notifications.map(notif => (
                        <div 
                          key={notif.id}
                          onClick={() => setNotifications(notifications.map(n => n.id === notif.id ? { ...n, read: true } : n))}
                          className={`p-4 border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer flex gap-3 ${notif.read ? 'opacity-60' : 'bg-brand-primary/5'}`}
                        >
                          <div className={`w-8 h-8 rounded-full ${notif.bg} flex items-center justify-center shrink-0`}>
                            <notif.icon size={16} className={notif.color} />
                          </div>
                          <div>
                            <p className="text-sm text-white font-medium">{notif.title}</p>
                            <p className="text-xs text-dark-muted mt-0.5">{notif.desc}</p>
                            <p className="text-[10px] text-dark-muted mt-1">{notif.time}</p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Quick Action */}
            <div className="relative" ref={quickRef}>
              <button 
                onClick={() => { setIsQuickActionOpen(!isQuickActionOpen); setIsNotificationsOpen(false); }}
                className="bg-brand-primary hover:bg-brand-primary/90 text-white px-5 py-2 rounded-full text-sm font-semibold shadow-[0_0_15px_rgba(91,140,255,0.3)] transition-all hover:scale-105"
              >
                Quick Action
              </button>

              {isQuickActionOpen && (
                <div className="absolute top-full right-0 mt-4 w-48 bg-dark-card border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 p-2">
                  <div 
                    onClick={() => { navigate('/dashboard/practice'); setIsQuickActionOpen(false); }}
                    className="flex items-center gap-3 px-3 py-2.5 hover:bg-white/5 rounded-xl cursor-pointer transition-colors text-white text-sm font-medium"
                  >
                    <PenTool size={16} className="text-brand-primary" />
                    Take a Quiz
                  </div>
                  <div 
                    onClick={() => { navigate('/dashboard/achievements'); setIsQuickActionOpen(false); }}
                    className="flex items-center gap-3 px-3 py-2.5 hover:bg-white/5 rounded-xl cursor-pointer transition-colors text-white text-sm font-medium"
                  >
                    <Award size={16} className="text-brand-secondary" />
                    View Leaderboard
                  </div>
                  <div 
                    onClick={() => { navigate('/dashboard'); setIsQuickActionOpen(false); alert('Settings page coming soon! For now, your dashboard acts as your profile.'); }}
                    className="flex items-center gap-3 px-3 py-2.5 hover:bg-white/5 rounded-xl cursor-pointer transition-colors text-white text-sm font-medium"
                  >
                    <Users size={16} className="text-brand-accent" />
                    Edit Profile
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        <div className="p-8 relative z-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
