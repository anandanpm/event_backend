import type { ObjectId } from "mongodb"
export interface ITicket {
  id?: ObjectId
  eventId: ObjectId
  name: string
  priceCents: number
  totalQuantity: number
  remainingQuantity: number
  createdAt: Date
  updatedAt: Date
}
