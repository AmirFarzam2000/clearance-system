import React from 'react';
import LoginIllustration from './LoginIllustration';
import LoginForm from '../forms/LoginForm';

interface LoginPageProps {
  onLoginSuccess?: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row px-4 md:px-10 lg:px-20 items-center justify-center w-full overflow-hidden">
      <div className="w-full lg:w-1/2 flex items-center pb-10 lg:pb-20 order-2 lg:order-1">
        <LoginForm onLoginSuccess={onLoginSuccess} />
      </div>
      <div className="w-full lg:w-1/2 order-1 lg:order-2">
        <LoginIllustration />
      </div>
    </div>
  );
};

export default LoginPage;
