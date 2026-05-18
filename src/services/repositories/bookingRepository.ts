import type { BookingRecord, BookingRequest, BookingResponse, BookingSummary } from "@/types/api";
import type { BookingStatus } from "@/types/common";

export class BookingRepository {
  private readonly bookings = new Map<string, BookingRecord>();

  constructor() {
    this.seedBookings();
  }

  createBooking(request: BookingRequest): BookingResponse {
    const bookingId = `booking_${Date.now()}`;
    const confirmationNumber = `WS${Math.random().toString(36).slice(2, 10).toUpperCase()}`;
    const [startDate = new Date().toISOString().split("T")[0], endDate = startDate] =
      request.selectedDates;
    const booking: BookingRecord = {
      id: bookingId,
      campsiteId: request.campsiteId,
      campsiteName: `WildScape campsite ${request.campsiteId}`,
      userId: request.userDetails.email,
      startDate,
      endDate,
      guests: request.guests,
      totalPrice: request.totalPrice,
      status: "confirmed",
      confirmationNumber,
      createdAt: new Date().toISOString(),
    };

    this.bookings.set(bookingId, booking);
    return {
      success: true,
      message: "Booking confirmed successfully!",
      bookingId,
      confirmationNumber,
    };
  }

  findByUser(userId: string): BookingSummary[] {
    return Array.from(this.bookings.values())
      .filter((booking) => booking.userId === userId || userId === "current_user")
      .slice(0, 8)
      .map(({ id, campsiteId, campsiteName, startDate, endDate, guests, totalPrice, status }) => ({
        id,
        campsiteId,
        campsiteName,
        startDate,
        endDate,
        guests,
        totalPrice,
        status,
      }));
  }

  cancel(bookingId: string): boolean {
    const booking = this.bookings.get(bookingId);
    if (!booking) {
      return false;
    }

    this.bookings.set(bookingId, { ...booking, status: "cancelled" });
    return true;
  }

  private seedBookings(): void {
    const statuses: BookingStatus[] = ["confirmed", "pending"];
    for (let index = 0; index < 6; index += 1) {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() + index * 10 + 3);
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 2);
      const id = `booking_${String(index + 1).padStart(3, "0")}`;
      this.bookings.set(id, {
        id,
        campsiteId: `camp_${String(index + 1).padStart(3, "0")}`,
        campsiteName: index % 2 === 0 ? "Aurora Valley Wilderness" : "Coastal Dunes Paradise",
        userId: "current_user",
        startDate: startDate.toISOString().split("T")[0],
        endDate: endDate.toISOString().split("T")[0],
        guests: index + 2,
        totalPrice: 160 + index * 35,
        status: statuses[index % statuses.length],
        createdAt: new Date().toISOString(),
      });
    }
  }
}
