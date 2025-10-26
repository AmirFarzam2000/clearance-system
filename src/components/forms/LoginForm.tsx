import React, { useState } from 'react';
import Logo from '../ui/Logo';
import InputField from './InputField';
import Button from '../ui/Button';
import UserIcon from '../ui/icons/UserIcon';
import LockIcon from '../ui/icons/LockIcon';
import { authApi } from '../../api/auth.api';

interface LoginFormProps {
  onLoginSuccess?: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('farzamfar');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await authApi.login({ username, password });
      console.log('Login successful:', response);
      
      if (onLoginSuccess) {
        onLoginSuccess();
      }
    } catch (error: any) {
      
      if (error.code === 'ECONNABORTED' || error.message?.includes('timeout')) {
        setError('زمان اتصال به سرور تمام شد. لطفاً اتصال اینترنت خود را بررسی کنید.');
      } else if (error.response?.status === 401) {
        setError('نام کاربری یا رمز عبور اشتباه است.');
      } else if (error.response?.status === 500) {
        setError('خطای سرور. لطفاً بعداً تلاش کنید.');
      } else if (error.response?.status >= 400 && error.response?.status < 500) {
        setError('درخواست نامعتبر. لطفاً اطلاعات را بررسی کنید.');
      } else if (!navigator.onLine) {
        setError('اتصال اینترنت برقرار نیست. لطفاً اتصال خود را بررسی کنید.');
      } else {
        setError(error.message || 'خطا در ورود. لطفاً دوباره تلاش کنید.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      className="p-8 w-full h-[400px]  max-w-sm"
      style={{
        borderRadius: '10px',
        background: '#f5f5f5',
        border: '5px solid #fff',
        boxShadow: '0 0 16px #292a330f, 0 6px 20px #292a3305'
      }}
    >
      <div className="text-center mb-8">
        <Logo className="mb-6" />
        <h1 className="text-2xl font-yekan-bold text-dark-gray">ورود</h1>
      </div>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm font-yekan">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-5">
        <InputField
          type="text"
          value={username}
          onChange={setUsername}
          icon={<UserIcon />}
        />
        
        <InputField
          type="password"
          value={password}
          onChange={setPassword}
          icon={<LockIcon />}
        />
        
        <Button type="submit" variant="primary" disabled={isLoading} className="font-yekan-medium">
          {isLoading ? 'در حال ورود...' : 'ورود'}
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
