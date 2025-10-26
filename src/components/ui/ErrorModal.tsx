import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface ErrorModalProps {
  isOpen: boolean;
  onClose: () => void;
  error: {
    ErrorType?: string;
    ActionErrors?: string[];
    ValidationErrors?: any[];
  } | null;
}

const ErrorModal: React.FC<ErrorModalProps> = ({ isOpen, onClose, error }) => {
  if (!error) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const actionErrors = error.ActionErrors || [];
  const validationErrors = error.ValidationErrors || [];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <motion.div 
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={handleBackdropClick}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
          <motion.div 
            className="relative bg-white rounded-lg shadow-xl w-full max-w-lg mx-4 flex flex-col gap-5 "
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ 
              duration: 0.3,
              ease: [0.4, 0.0, 0.2, 1]
            }}
          >
            <button
              onClick={onClose}
              className="absolute top-4 left-4 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white hover:bg-red-600 transition-colors z-20 shadow-lg"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>

            <motion.div 
              className="p-6 "
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.2 }}
            >
              <div>
                {actionErrors.length > 0 && (
                  <ul className="space-y-2">
                    {actionErrors.map((errorMessage, index) => (
                      <li key={index} className="flex items-start gap-2 text-right">
                        <span className="text-gray-800 mt-1">•</span>
                        <span className="text-gray-800 font-yekan text-sm leading-relaxed">
                          {errorMessage}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}

                {validationErrors.length > 0 && (
                  <ul className="space-y-2 mt-4">
                    {validationErrors.map((validationError: any, index: number) => (
                      <li key={index} className="flex items-start gap-2 text-right">
                        <span className="text-gray-800 mt-1">•</span>
                        <span className="text-gray-800 font-yekan text-sm leading-relaxed">
                          {validationError.ErrorMessage || validationError.message || 'خطا در اعتبارسنجی'}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}

                {actionErrors.length === 0 && validationErrors.length === 0 && (
                  <p className="text-gray-800 font-yekan text-sm text-right">
                    خطایی رخ داده است
                  </p>
                )}
              </div>
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ErrorModal;
