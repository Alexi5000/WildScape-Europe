import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X, Settings, Cloud, Calendar, Star, AlertTriangle } from 'lucide-react';
import { useRealTime } from '@/hooks/useRealTime';
import { LiveUpdate } from '@/services/realTimeService';

export const NotificationCenter: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const { notifications, clearNotifications, updatePreferences, preferences } = useRealTime();

  const getNotificationIcon = (type: LiveUpdate['type']) => {
    switch (type) {
      case 'weather':
        return <Cloud className="w-4 h-4 text-blue-500" />;
      case 'booking':
        return <Calendar className="w-4 h-4 text-green-500" />;
      case 'review':
        return <Star className="w-4 h-4 text-yellow-500" />;
      case 'availability':
        return <AlertTriangle className="w-4 h-4 text-orange-500" />;
      default:
        return <Bell className="w-4 h-4 text-gray-500" />;
    }
  };

  const formatNotificationMessage = (notification: LiveUpdate) => {
    switch (notification.type) {
      case 'weather':
        return `Weather update: ${notification.data.condition} at ${notification.data.temperature}°C`;
      case 'booking':
        return notification.data.message || 'Booking status updated';
      case 'review':
        return `New ${notification.data.rating}⭐ review: "${notification.data.preview}"`;
      case 'availability':
        return `Availability changed: ${notification.data.available ? 'Spots available' : 'Fully booked'}`;
      default:
        return 'System notification';
    }
  };

  const formatTime = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return new Date(timestamp).toLocaleDateString();
  };

  return (
    <div className="relative">
      {/* Notification Bell */}
      <motion.button
        className="relative p-2 text-white hover:text-primary transition-colors"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Bell className="w-6 h-6" />
        {notifications.length > 0 && (
          <motion.span
            className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          >
            {notifications.length > 9 ? '9+' : notifications.length}
          </motion.span>
        )}
      </motion.button>

      {/* Notification Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute top-full right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border overflow-hidden z-50"
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b bg-gray-50">
              <h3 className="font-semibold text-gray-900">Notifications</h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowSettings(!showSettings)}
                  className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                >
                  <Settings className="w-4 h-4 text-gray-600" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                >
                  <X className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Settings Panel */}
            <AnimatePresence>
              {showSettings && (
                <motion.div
                  className="p-4 border-b bg-gray-50"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Notification Preferences</h4>
                  <div className="space-y-2">
                    {Object.entries(preferences).map(([key, value]) => (
                      <label key={key} className="flex items-center justify-between">
                        <span className="text-sm text-gray-700 capitalize">
                          {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                        </span>
                        <input
                          type="checkbox"
                          checked={value}
                          onChange={(e) => updatePreferences({ [key]: e.target.checked })}
                          className="text-primary focus:ring-primary"
                        />
                      </label>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Notifications List */}
            <div className="max-h-96 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p>No new notifications</p>
                </div>
              ) : (
                <div className="divide-y">
                  {notifications.map((notification, index) => (
                    <motion.div
                      key={`${notification.timestamp}-${index}`}
                      className="p-4 hover:bg-gray-50 transition-colors"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-1">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-900 mb-1">
                            {formatNotificationMessage(notification)}
                          </p>
                          <p className="text-xs text-gray-500">
                            {formatTime(notification.timestamp)}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {notifications.length > 0 && (
              <div className="p-3 border-t bg-gray-50">
                <button
                  onClick={clearNotifications}
                  className="w-full text-sm text-primary hover:text-primary/80 transition-colors"
                >
                  Clear all notifications
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};