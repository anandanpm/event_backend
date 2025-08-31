import type { ObjectId } from "mongodb"
import type { Ticket } from "../../models/Ticket"

export interface ITicketRepository {
  create(data: Partial<Ticket>): Promise<Ticket>
  update(id: ObjectId, data: Partial<Ticket>): Promise<Ticket | null>
  findById(id: ObjectId): Promise<Ticket | null>
  listByEvent(eventId: ObjectId): Promise<Ticket[]>
}
