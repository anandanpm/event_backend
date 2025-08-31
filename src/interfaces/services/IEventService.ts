import type { Event } from "../../models/Event"
import type { ObjectId } from "mongodb"
export interface IEventService {
  create(organizerId: ObjectId, data: Partial<Event>): Promise<Event>
  update(organizerId: ObjectId, id: ObjectId, data: Partial<Event>): Promise<Event>
  delete(organizerId: ObjectId, id: ObjectId): Promise<void>
  get(id: ObjectId): Promise<Event>
  list(): Promise<Event[]>
}
