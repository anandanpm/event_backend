import type { ObjectId } from "mongodb"
import type { Booking } from "../../models/Booking"

export interface IBookingRepository {
  create(data: Partial<Booking>): Promise<Booking>
  update(id: ObjectId, data: Partial<Booking>): Promise<Booking | null>
  findById(id: ObjectId): Promise<Booking | null>
  findByPaymentIntent(paymentIntentId: string): Promise<Booking | null>
  listByUser(userId: ObjectId): Promise<Booking[]>
}
