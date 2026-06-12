import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from './store/store';

// Pages & Layouts
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardLayout from './layouts/DashboardLayout';
import AdminDashboard from './pages/AdminDashboard';
import StudentDashboard from './pages/StudentDashboard';
import Subjects from './pages/Subjects';
import Practice from './pages/Practice';
import Achievements from './pages/Achievements';
import Quizzes from './pages/Quizzes';
import Users from './pages/Users';
import QuizTaker from './pages/QuizTaker';
import CodeEditor from './pages/CodeEditor';
import CourseViewer from './pages/CourseViewer';
import PublicProfile from './pages/PublicProfile';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

const DashboardRouter = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  return user?.role === 'admin' ? <AdminDashboard /> : <StudentDashboard />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile/:id" element={<PublicProfile />} />
        
        <Route 
          path="/dashboard" 
          element={
            <PrivateRoute>
              <DashboardLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<DashboardRouter />} />
          <Route path="subjects" element={<Subjects />} />
          <Route path="practice" element={<Practice />} />
          <Route path="achievements" element={<Achievements />} />
          <Route path="quizzes" element={<Quizzes />} />
          <Route path="users" element={<Users />} />
          <Route path="quiz/:id" element={<QuizTaker />} />
          <Route path="course/:id" element={<CourseViewer />} />
        </Route>

        {/* Full-screen protected routes outside the dashboard layout */}
        <Route 
          path="/dashboard/code/:id" 
          element={
            <PrivateRoute>
              <CodeEditor />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
