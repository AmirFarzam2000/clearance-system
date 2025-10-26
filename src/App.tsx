import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/layout/LoginPage';
import Dashboard from './components/layout/Dashboard';
import { authApi } from './api/auth.api';

function AppRoutes() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeApp = () => {
      authApi.initialize();
      
      const authenticated = authApi.isAuthenticated();
      setIsAuthenticated(authenticated);
      setIsLoading(false);
    };

    initializeApp();
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setTimeout(() => {
      window.location.href = '/dashboard';
    }, 100);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 font-yekan">در حال بارگذاری...</p>
        </div>
      </div>
    );
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
