import { inject, injectable } from "tsyringe"
import type { ObjectId } from "mongodb"
import type { Ticket } from "../models/Ticket"
import { IEventRepository } from "../interfaces/repositories/IEventRepository"
import { ITicketRepository } from "../interfaces/repositories/ITicketRepository"


@injectable()
export class TicketService {
  constructor(
    @inject("TicketRepository") private tickets: ITicketRepository,
    @inject("EventRepository") private events: IEventRepository,

  ) {}

  async create(eventId: ObjectId, data: Partial<Ticket>) {
    const event = await this.events.findById(eventId)
    if (!event) throw new Error("Event not found")
    const now = new Date()
    const ticket: Partial<Ticket> = {
      ...data,
      eventId,
      remainingQuantity: data.totalQuantity || 0,
      createdAt: now,
      updatedAt: now,
    }
    return this.tickets.create(ticket)
  }

  async listByEvent(eventId: ObjectId) {
    return this.tickets.listByEvent(eventId)
  }

  async get(id: ObjectId) {
    const t = await this.tickets.findById(id)
    if (!t) throw new Error("Ticket not found")
    return t
  }
}
