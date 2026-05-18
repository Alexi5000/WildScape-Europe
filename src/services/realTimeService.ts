import type { BookingStatus, WeatherCondition } from "@/types/common";
import type { LiveUpdate, NotificationPreferences } from "@/types/realtime";

export type { LiveUpdate, NotificationPreferences } from "@/types/realtime";

type Listener = (update: LiveUpdate) => void;

const weatherConditions: WeatherCondition[] = ["clear", "rain", "snow", "fog", "cloudy"];
const bookingStatuses: BookingStatus[] = ["confirmed", "cancelled", "modified"];
const randomItem = <T>(items: readonly T[]): T => items[Math.floor(Math.random() * items.length)];
const randomCampsiteId = (): string =>
  `camp_${String(Math.floor(Math.random() * 150) + 1).padStart(3, "0")}`;

export class RealTimeService {
  private static instance: RealTimeService;
  private readonly listeners = new Map<string, Listener>();
  private isConnected = false;
  private updateInterval: ReturnType<typeof setInterval> | null = null;
  private notificationPreferences: NotificationPreferences = {
    weatherAlerts: true,
    bookingUpdates: true,
    priceDrops: true,
    newReviews: false,
    systemMessages: true,
  };

  public static getInstance(): RealTimeService {
    if (!RealTimeService.instance) {
      RealTimeService.instance = new RealTimeService();
    }

    return RealTimeService.instance;
  }

  connect(): void {
    if (this.isConnected) {
      return;
    }

    this.isConnected = true;
    this.updateInterval = setInterval(() => {
      this.generateRandomUpdate();
    }, 15000);
  }

  disconnect(): void {
    if (!this.isConnected) {
      return;
    }

    this.isConnected = false;
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
      this.updateInterval = null;
    }
  }

  subscribe(id: string, callback: Listener): void {
    this.listeners.set(id, callback);
  }

  unsubscribe(id: string): void {
    this.listeners.delete(id);
  }

  updateNotificationPreferences(preferences: Partial<NotificationPreferences>): void {
    this.notificationPreferences = { ...this.notificationPreferences, ...preferences };
  }

  getNotificationPreferences(): NotificationPreferences {
    return { ...this.notificationPreferences };
  }

  simulateWeatherAlert(campsiteId: string, severity: "low" | "medium" | "high"): void {
    this.broadcastUpdate({
      type: "weather",
      data: {
        campsiteId,
        severity,
        alert: `${severity.toUpperCase()} weather alert: Check conditions before traveling`,
        condition: severity === "high" ? "snow" : "rain",
        temperature: severity === "high" ? -10 : 5,
      },
      timestamp: Date.now(),
    });
  }

  simulateBookingUpdate(bookingId: string, status: BookingStatus): void {
    this.broadcastUpdate({
      type: "booking",
      data: {
        bookingId,
        status,
        message: `Booking ${bookingId} status updated to ${status}`,
        timestamp: new Date().toISOString(),
      },
      timestamp: Date.now(),
    });
  }

  simulateAvailabilityChange(campsiteId: string, date: string, available: boolean): void {
    this.broadcastUpdate({
      type: "availability",
      data: {
        campsiteId,
        date,
        available,
        spotsRemaining: available ? Math.floor(Math.random() * 10) + 1 : 0,
        message: available ? "New spots available!" : "Fully booked",
      },
      timestamp: Date.now(),
    });
  }

  private generateRandomUpdate(): void {
    const factories: Array<() => LiveUpdate> = [
      () => ({
        type: "weather",
        data: {
          campsiteId: randomCampsiteId(),
          condition: randomItem(weatherConditions),
          temperature: Math.floor(Math.random() * 30) - 5,
          alert: Math.random() > 0.8 ? "Severe weather warning in effect" : null,
        },
        timestamp: Date.now(),
      }),
      () => ({
        type: "availability",
        data: {
          campsiteId: randomCampsiteId(),
          date: new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000)
            .toISOString()
            .split("T")[0],
          available: Math.random() > 0.5,
          spotsRemaining: Math.floor(Math.random() * 10) + 1,
        },
        timestamp: Date.now(),
      }),
      () => ({
        type: "booking",
        data: {
          campsiteId: randomCampsiteId(),
          bookingId: `booking_${Date.now()}`,
          status: randomItem(bookingStatuses),
          message: "Your booking status has been updated",
        },
        timestamp: Date.now(),
      }),
      () => ({
        type: "review",
        data: {
          campsiteId: randomCampsiteId(),
          rating: Math.floor(Math.random() * 2) + 4,
          reviewer: "Anonymous User",
          preview: "Amazing experience with beautiful views...",
        },
        timestamp: Date.now(),
      }),
    ];

    this.broadcastUpdate(randomItem(factories)());
  }

  private broadcastUpdate(update: LiveUpdate): void {
    if (!this.shouldNotifyForUpdate(update)) {
      return;
    }

    this.listeners.forEach((callback) => {
      try {
        callback(update);
      } catch (error) {
        console.error("Error in real-time update callback:", error);
      }
    });
  }

  private shouldNotifyForUpdate(update: LiveUpdate): boolean {
    switch (update.type) {
      case "weather":
        return this.notificationPreferences.weatherAlerts;
      case "booking":
        return this.notificationPreferences.bookingUpdates;
      case "review":
        return this.notificationPreferences.newReviews;
      case "system":
        return this.notificationPreferences.systemMessages;
      case "availability":
        return true;
    }
  }
}

export const realTimeService = RealTimeService.getInstance();
