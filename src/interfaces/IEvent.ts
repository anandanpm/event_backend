import type { ObjectId } from "mongodb"
export interface IEvent {
  id?: ObjectId
  title: string
  description: string
  location: string
  date: Date
  organizerId: ObjectId
  createdAt: Date
  updatedAt: Date
}
