// Real-time service for live updates and notifications
export interface LiveUpdate {
  type: 'booking' | 'weather' | 'availability' | 'review' | 'system';
  data: any;
  timestamp: number;
}

export interface NotificationPreferences {
  weatherAlerts: boolean;
  bookingUpdates: boolean;
  priceDrops: boolean;
  newReviews: boolean;
  systemMessages: boolean;
}

export class RealTimeService {
  private static instance: RealTimeService;
  private listeners: Map<string, (update: LiveUpdate) => void> = new Map();
  private isConnected = false;
  private updateInterval: NodeJS.Timeout | null = null;
  private notificationPreferences: NotificationPreferences = {
    weatherAlerts: true,
    bookingUpdates: true,
    priceDrops: true,
    newReviews: false,
    systemMessages: true
  };

  public static getInstance(): RealTimeService {
    if (!RealTimeService.instance) {
      RealTimeService.instance = new RealTimeService();
    }
    return RealTimeService.instance;
  }

  connect(): void {
    if (this.isConnected) return;
    
    this.isConnected = true;
    console.log('🔗 Real-time service connected');
    
    // Simulate real-time updates
    this.updateInterval = setInterval(() => {
      this.generateRandomUpdate();
    }, 15000); // Update every 15 seconds
  }

  disconnect(): void {
    if (!this.isConnected) return;
    
    this.isConnected = false;
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
      this.updateInterval = null;
    }
    console.log('🔌 Real-time service disconnected');
  }

  subscribe(id: string, callback: (update: LiveUpdate) => void): void {
    this.listeners.set(id, callback);
  }

  unsubscribe(id: string): void {
    this.listeners.delete(id);
  }

  private generateRandomUpdate(): void {
    const updateTypes = ['weather', 'availability', 'booking', 'review'];
    const type = updateTypes[Math.floor(Math.random() * updateTypes.length)] as LiveUpdate['type'];
    
    let data: any;
    
    switch (type) {
      case 'weather':
        data = {
          campsiteId: `camp_${String(Math.floor(Math.random() * 150) + 1).padStart(3, '0')}`,
          condition: ['clear', 'rain', 'snow', 'fog', 'cloudy'][Math.floor(Math.random() * 5)],
          temperature: Math.floor(Math.random() * 30) - 5,
          alert: Math.random() > 0.8 ? 'Severe weather warning in effect' : null
        };
        break;
        
      case 'availability':
        data = {
          campsiteId: `camp_${String(Math.floor(Math.random() * 150) + 1).padStart(3, '0')}`,
          date: new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          available: Math.random() > 0.5,
          spotsRemaining: Math.floor(Math.random() * 10) + 1
        };
        break;
        
      case 'booking':
        data = {
          campsiteId: `camp_${String(Math.floor(Math.random() * 150) + 1).padStart(3, '0')}`,
          bookingId: `booking_${Date.now()}`,
          status: ['confirmed', 'cancelled', 'modified'][Math.floor(Math.random() * 3)],
          message: 'Your booking status has been updated'
        };
        break;
        
      case 'review':
        data = {
          campsiteId: `camp_${String(Math.floor(Math.random() * 150) + 1).padStart(3, '0')}`,
          rating: Math.floor(Math.random() * 2) + 4,
          reviewer: 'Anonymous User',
          preview: 'Amazing experience with beautiful views...'
        };
        break;
    }
    
    const update: LiveUpdate = {
      type,
      data,
      timestamp: Date.now()
    };
    
    this.broadcastUpdate(update);
  }

  private broadcastUpdate(update: LiveUpdate): void {
    // Check notification preferences
    const shouldNotify = this.shouldNotifyForUpdate(update);
    
    if (shouldNotify) {
      this.listeners.forEach(callback => {
        try {
          callback(update);
        } catch (error) {
          console.error('Error in real-time update callback:', error);
        }
      });
    }
  }

  private shouldNotifyForUpdate(update: LiveUpdate): boolean {
    switch (update.type) {
      case 'weather':
        return this.notificationPreferences.weatherAlerts;
      case 'booking':
        return this.notificationPreferences.bookingUpdates;
      case 'review':
        return this.notificationPreferences.newReviews;
      case 'system':
        return this.notificationPreferences.systemMessages;
      default:
        return true;
    }
  }

  updateNotificationPreferences(preferences: Partial<NotificationPreferences>): void {
    this.notificationPreferences = { ...this.notificationPreferences, ...preferences };
  }

  getNotificationPreferences(): NotificationPreferences {
    return { ...this.notificationPreferences };
  }

  // Simulate specific updates for testing
  simulateWeatherAlert(campsiteId: string, severity: 'low' | 'medium' | 'high'): void {
    const update: LiveUpdate = {
      type: 'weather',
      data: {
        campsiteId,
        severity,
        alert: `${severity.toUpperCase()} weather alert: Check conditions before traveling`,
        condition: severity === 'high' ? 'snow' : 'rain',
        temperature: severity === 'high' ? -10 : 5
      },
      timestamp: Date.now()
    };
    
    this.broadcastUpdate(update);
  }

  simulateBookingUpdate(bookingId: string, status: string): void {
    const update: LiveUpdate = {
      type: 'booking',
      data: {
        bookingId,
        status,
        message: `Booking ${bookingId} status updated to ${status}`,
        timestamp: new Date().toISOString()
      },
      timestamp: Date.now()
    };
    
    this.broadcastUpdate(update);
  }

  simulateAvailabilityChange(campsiteId: string, date: string, available: boolean): void {
    const update: LiveUpdate = {
      type: 'availability',
      data: {
        campsiteId,
        date,
        available,
        spotsRemaining: available ? Math.floor(Math.random() * 10) + 1 : 0,
        message: available ? 'New spots available!' : 'Fully booked'
      },
      timestamp: Date.now()
    };
    
    this.broadcastUpdate(update);
  }
}

export const realTimeService = RealTimeService.getInstance();