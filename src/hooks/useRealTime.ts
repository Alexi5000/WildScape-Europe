import { useState, useEffect, useCallback } from 'react';
import { realTimeService, LiveUpdate, NotificationPreferences } from '@/services/realTimeService';

export const useRealTime = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<LiveUpdate | null>(null);
  const [notifications, setNotifications] = useState<LiveUpdate[]>([]);

  useEffect(() => {
    const handleUpdate = (update: LiveUpdate) => {
      setLastUpdate(update);
      setNotifications(prev => [update, ...prev.slice(0, 9)]); // Keep last 10 notifications
    };

    realTimeService.subscribe('main', handleUpdate);
    realTimeService.connect();
    setIsConnected(true);

    return () => {
      realTimeService.unsubscribe('main');
      realTimeService.disconnect();
      setIsConnected(false);
    };
  }, []);

  const clearNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  const updatePreferences = useCallback((preferences: Partial<NotificationPreferences>) => {
    realTimeService.updateNotificationPreferences(preferences);
  }, []);

  return {
    isConnected,
    lastUpdate,
    notifications,
    clearNotifications,
    updatePreferences,
    preferences: realTimeService.getNotificationPreferences()
  };
};