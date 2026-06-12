import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, BookOpen, PenTool, TrendingUp, Download, CheckCircle2, AlertCircle } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend, Cell } from 'recharts';

const growthData = [
  { name: 'Jan', students: 400, quizzes: 240 },
  { name: 'Feb', students: 600, quizzes: 398 },
  { name: 'Mar', students: 800, quizzes: 580 },
  { name: 'Apr', students: 1200, quizzes: 890 },
  { name: 'May', students: 1800, quizzes: 1300 },
  { name: 'Jun', students: 2400, quizzes: 1900 },
];

const branchData = [
  { name: 'CSE', value: 45, color: '#5B8CFF' },
  { name: 'IT', value: 25, color: '#00D4FF' },
  { name: 'ECE', value: 15, color: '#7B61FF' },
  { name: 'ME', value: 10, color: '#F59E0B' },
  { name: 'CE', value: 5, color: '#22C55E' },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const item = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card p-4 rounded-xl border border-white/10 shadow-2xl">
        <p className="text-white font-bold mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2 mb-1">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
            <p className="text-sm text-dark-muted">
              {entry.name}: <span className="font-bold text-white">{entry.value}</span>
            </p>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const AdminDashboard: React.FC = () => {
  const [timeRange, setTimeRange] = useState('6M');

  const stats = [
    { label: 'Total Students', value: '2,400', icon: Users, color: 'text-brand-primary', bg: 'bg-brand-primary/10', trend: '+15% this month' },
    { label: 'Active Courses', value: '42', icon: BookOpen, color: 'text-brand-secondary', bg: 'bg-brand-secondary/10', trend: '+3 new courses' },
    { label: 'Quizzes Taken', value: '14,592', icon: PenTool, color: 'text-brand-accent', bg: 'bg-brand-accent/10', trend: '+1,200 this week' },
    { label: 'Avg Platform Score', value: '76%', icon: TrendingUp, color: 'text-semantic-success', bg: 'bg-semantic-success/10', trend: '+2.4% overall' },
  ];

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto pb-12 relative">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl lg:text-3xl font-bold text-white tracking-tight">Platform Analytics</h2>
          <p className="text-dark-muted mt-1">Real-time insights into student engagement and platform growth.</p>
        </div>
        <button className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white px-5 py-2.5 rounded-full text-sm font-medium transition-all shadow-lg">
          <Download size={16} />
          <span>Export Report</span>
        </button>
      </div>

      {/* KPI Stats Grid */}
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {stats.map((stat) => (
          <motion.div 
            key={stat.label} 
            variants={item}
            whileHover={{ y: -4, scale: 1.01 }}
            className="glass p-5 rounded-2xl relative overflow-hidden group border border-white/5 shadow-lg transition-all"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-xl ${stat.bg} ${stat.color} shadow-inner`}>
                  <stat.icon size={20} />
                </div>
                <div className="flex items-center space-x-1 text-semantic-success text-[10px] font-bold bg-semantic-success/10 px-2 py-1 rounded-full">
                  <TrendingUp size={10} />
                  <span>Up</span>
                </div>
              </div>
              <h3 className="text-3xl font-bold text-white tracking-tight mb-1">{stat.value}</h3>
              <p className="text-xs font-semibold text-dark-muted">{stat.label}</p>
              <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                <span className="text-[10px] text-dark-muted font-medium">{stat.trend}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Growth Area Chart */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2 glass-card p-6 rounded-2xl"
        >
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-bold text-white">Platform Growth</h3>
              <p className="text-xs text-dark-muted">Active students vs completed quizzes over time</p>
            </div>
            <div className="flex gap-2">
              {['1M', '3M', '6M', '1Y'].map(range => (
                <button 
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${timeRange === range ? 'bg-brand-primary text-white' : 'bg-white/5 text-dark-muted hover:bg-white/10'}`}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={growthData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorStudents" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#5B8CFF" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#5B8CFF" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorQuizzes" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00D4FF" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#00D4FF" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="name" stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
                <Area type="monotone" dataKey="students" name="Active Students" stroke="#5B8CFF" strokeWidth={3} fillOpacity={1} fill="url(#colorStudents)" />
                <Area type="monotone" dataKey="quizzes" name="Quizzes Taken" stroke="#00D4FF" strokeWidth={3} fillOpacity={1} fill="url(#colorQuizzes)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Branch Distribution Chart */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card p-6 rounded-2xl flex flex-col"
        >
          <div className="mb-6">
            <h3 className="text-lg font-bold text-white">Students by Branch</h3>
            <p className="text-xs text-dark-muted">Percentage distribution</p>
          </div>
          <div className="flex-1 min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={branchData} layout="vertical" margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={true} vertical={false} />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} width={40} />
                <Tooltip cursor={{ fill: 'rgba(255,255,255,0.05)' }} content={<CustomTooltip />} />
                <Bar dataKey="value" name="Students %" radius={[0, 4, 4, 0]} barSize={20}>
                  {branchData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
        
      </div>

      {/* System Health / Alerts */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div className="glass p-5 rounded-2xl border-l-4 border-l-semantic-success flex items-start gap-4">
          <div className="p-2 bg-semantic-success/10 rounded-full shrink-0">
            <CheckCircle2 className="text-semantic-success" size={24} />
          </div>
          <div>
            <h4 className="text-white font-bold text-sm">System Status: All Systems Operational</h4>
            <p className="text-dark-muted text-xs mt-1">Database, Auth, and Vercel edge functions are responding in &lt;50ms. No reported outages in the last 72 hours.</p>
          </div>
        </div>
        
        <div className="glass p-5 rounded-2xl border-l-4 border-l-semantic-warning flex items-start gap-4">
          <div className="p-2 bg-semantic-warning/10 rounded-full shrink-0">
            <AlertCircle className="text-semantic-warning" size={24} />
          </div>
          <div>
            <h4 className="text-white font-bold text-sm">Action Required: Subject Data Missing</h4>
            <p className="text-dark-muted text-xs mt-1">3 Mechanical Engineering quizzes are missing correct answers. Review the content database to ensure students can complete them.</p>
          </div>
        </div>
      </motion.div>

    </div>
  );
};

export default AdminDashboard;
