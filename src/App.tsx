import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/layout/LoginPage';
import Dashboard from './components/layout/Dashboard';
import Loading from './components/ui/Loading';
import { authApi } from './api/auth.api';
import { validateToken } from './api/Api';

function AppRoutes() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeApp = async () => {
      authApi.initialize();
      
      // Show loading for at least 2 seconds for better UX
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const user = authApi.getCurrentUser();
      const authenticated = authApi.isAuthenticated() && validateToken(user?.token || '');
      
      if (!authenticated) {
        authApi.logout();
      }
      
      setIsAuthenticated(authenticated);
      setIsLoading(false);
    };

    initializeApp();
  }, []);

  useEffect(() => {
    // Check token expiration every minute
    const tokenCheckInterval = setInterval(() => {
      const user = authApi.getCurrentUser();
      if (!user || !validateToken(user.token || '')) {
        authApi.logout();
        setIsAuthenticated(false);
        if (window.location.pathname !== '/login') {
          window.location.href = '/login';
        }
      }
    }, 60000); // Check every minute

    return () => clearInterval(tokenCheckInterval);
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setTimeout(() => {
      window.location.href = '/dashboard';
    }, 100);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Routes>
      <Route 
        path="/login" 
        element={
          isAuthenticated ? 
          <Navigate to="/dashboard" replace /> : 
          <LoginPage onLoginSuccess={handleLoginSuccess} />
        } 
      />
      <Route 
        path="/dashboard/*" 
        element={
          isAuthenticated ? 
          <Dashboard /> : 
          <Navigate to="/login" replace />
        } 
      />
      <Route 
        path="/" 
        element={
          <Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />
        } 
      />
      <Route 
        path="*" 
        element={
          <Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />
        } 
      />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
