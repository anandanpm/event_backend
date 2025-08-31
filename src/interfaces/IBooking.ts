import type { ObjectId } from "mongodb"
export interface IBooking {
  id?: ObjectId
  userId: ObjectId
  eventId: ObjectId
  ticketId: ObjectId
  quantity: number
  amountCents: number
  paymentIntentId: string
  status: "pending" | "paid" | "failed" | "cancelled"
  createdAt: Date
  updatedAt: Date
}
