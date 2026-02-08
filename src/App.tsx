import React, { JSX } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext'; // Import your new context

// Pages
import LoginPage from './pages/Login';
import SignupPage from './pages/Signup';
import ForgotPasswordPage from './pages/ForgotPassword';
import DashboardPage from './pages/Dashboard';
import WorkspacePage from './pages/Workspace';
import GalleryPage from './pages/Gallery';
import CommunityPage from './pages/Community';
import ProfilePage from './pages/Profile';

// Layout
import Layout from './components/Layout';
import RectoLandingPage from './pages/Landingpage';

// --- Helper Components for Routing ---

// 1. Protects routes like Dashboard (Redirects to Login if not auth)
const ProtectedRoute = () => {
  const { user, loading } = useAuth();
  
  if (loading) return <div className="h-screen w-full flex items-center justify-center">Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  
  return <Outlet />; // Renders the child route (Layout)
};

// 2. Protects routes like Login (Redirects to Dashboard if already auth)
const PublicOnlyRoute = ({ children }: { children: JSX.Element }) => {
  const { user, loading } = useAuth();

  if (loading) return null; // Or a spinner
  if (user) return <Navigate to="/dashboard" replace />;
  
  return children;
};

// --- Main App Component ---

const App: React.FC = () => {
  // logic for state/login/logout is now removed (handled by AuthProvider)

  return (
    // 1. Wrap the entire Router in AuthProvider
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Route: Landing Page (Always visible) */}
          <Route path="/" element={<RectoLandingPage />} />

          {/* Public Only Routes: Login/Signup (Redirect to Dashboard if logged in) */}
          <Route 
            path="/login" 
            element={
              <PublicOnlyRoute>
                {/* Remove onLogin prop, LoginPage should use useAuth() or supabase directly */}
                <LoginPage /> 
              </PublicOnlyRoute>
            } 
          />
          <Route 
            path="/signup" 
            element={
              <PublicOnlyRoute>
                <SignupPage />
              </PublicOnlyRoute>
            } 
          />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />

          {/* Protected Routes: Dashboard */}
          <Route element={<ProtectedRoute />}>
            {/* Layout no longer needs onLogout prop, it should use useAuth() internaly */}
            <Route path="/dashboard" element={<Layout />}>
              <Route index element={<DashboardPage />} />
              <Route path="workspace" element={<WorkspacePage />} />
              <Route path="workspace/:id" element={<WorkspacePage />} />
              <Route path="gallery" element={<GalleryPage />} />
              <Route path="community" element={<CommunityPage />} />
              <Route path="profile" element={<ProfilePage />} />
            </Route>
          </Route>

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;