import React from 'react';

const Loading: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center">
      <div className="text-center">
        {/* Logo with animation */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            {/* Pulsing circle around logo */}
            <div className="absolute inset-0 rounded-full bg-blue-200 animate-ping opacity-20"></div>
            <div className="absolute inset-0 rounded-full bg-blue-300 animate-pulse opacity-30"></div>
            
            {/* Logo container */}
            <div className="relative bg-white rounded-full p-6 shadow-2xl transform transition-all duration-500 hover:scale-105">
              <img 
                src="/Image/logo.svg" 
                alt="Logo" 
                className="w-24 h-24 animate-spin-slow"
                style={{
                  animation: 'spin 3s linear infinite'
                }}
              />
            </div>
          </div>
        </div>

        {/* Loading text */}
        <h2 className="text-2xl font-yekan-bold text-blue-600 mb-2 animate-pulse">
          در حال بارگذاری
        </h2>
        
        {/* Loading dots */}
        <div className="flex justify-center gap-2 mt-4">
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin 3s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Loading;
