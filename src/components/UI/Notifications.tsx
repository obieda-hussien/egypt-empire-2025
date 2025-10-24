import React from 'react';
import { useGameStore } from '../../store/gameStore';
import { X, CheckCircle, AlertTriangle, AlertCircle, Info } from 'lucide-react';

export const Notifications: React.FC = () => {
  const { notifications, removeNotification } = useGameStore();
  
  const icons = {
    success: <CheckCircle className="text-green-500" size={20} />,
    warning: <AlertTriangle className="text-orange-500" size={20} />,
    error: <AlertCircle className="text-red-500" size={20} />,
    info: <Info className="text-blue-500" size={20} />,
  };
  
  const bgColors = {
    success: 'bg-green-50 border-green-200',
    warning: 'bg-orange-50 border-orange-200',
    error: 'bg-red-50 border-red-200',
    info: 'bg-blue-50 border-blue-200',
  };
  
  return (
    <div className="fixed top-20 right-4 z-50 space-y-2 max-w-md">
      {notifications.map(notification => (
        <div
          key={notification.id}
          className={`flex items-start gap-3 p-4 rounded-lg border shadow-lg ${bgColors[notification.type]} animate-slide-in`}
        >
          <div className="flex-shrink-0 mt-0.5">
            {icons[notification.type]}
          </div>
          <div className="flex-1 text-sm text-gray-800">
            {notification.message}
          </div>
          <button
            onClick={() => removeNotification(notification.id)}
            className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  );
};
