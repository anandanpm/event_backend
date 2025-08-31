import type { Ticket } from "../../models/Ticket"
import type { ObjectId } from "mongodb"
export interface ITicketService {
  create(eventId: ObjectId, data: Partial<Ticket>): Promise<Ticket>
  listByEvent(eventId: ObjectId): Promise<Ticket[]>
  get(id: ObjectId): Promise<Ticket>
}
