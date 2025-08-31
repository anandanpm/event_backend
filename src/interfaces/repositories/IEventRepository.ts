import type { ObjectId } from "mongodb"
import type { Event } from "../../models/Event"

export interface IEventRepository {
  create(data: Partial<Event>): Promise<Event>
  update(id: ObjectId, data: Partial<Event>): Promise<Event | null>
  delete(id: ObjectId): Promise<boolean>
  findById(id: ObjectId): Promise<Event | null>
  list(): Promise<Event[]>
  listByOrganizer(organizerId: ObjectId): Promise<Event[]>
}
