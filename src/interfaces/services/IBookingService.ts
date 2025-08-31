import type { Booking } from "../../models/Booking"
import type { ObjectId } from "mongodb"
export interface IBookingService {
  createBooking(
    userId: ObjectId,
    ticketId: ObjectId,
    quantity: number,
  ): Promise<{ booking: Booking; clientSecret: string | null }>
  handlePaymentSucceeded(paymentIntentId: string): Promise<void>
  listForUser(userId: ObjectId): Promise<Booking[]>
}
