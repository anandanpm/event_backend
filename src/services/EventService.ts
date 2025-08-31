import { inject, injectable } from "tsyringe"
import { IEventRepository } from "../interfaces/repositories/IEventRepository"
import type { ObjectId } from "mongodb"
import type { Event } from "../models/Event"

@injectable()
export class EventService {
  constructor(@inject('EventRepository') private events: IEventRepository) {}

  async create(organizerId: ObjectId, data: Partial<Event>) {
    const now = new Date()
    const event: Partial<Event> = {
      ...data,
      organizerId,
      createdAt: now,
      updatedAt: now,
    }
    return this.events.create(event)
  }

  async update(organizerId: ObjectId, id: ObjectId, data: Partial<Event>) {
    const existing = await this.events.findById(id)
    if (!existing) throw new Error("Event not found")
    if (existing.organizerId.toHexString() !== organizerId.toHexString()) throw new Error("Forbidden")
    data.updatedAt = new Date()
    const updated = await this.events.update(id, data)
    if (!updated) throw new Error("Update failed")
    return updated
  }

  async delete(organizerId: ObjectId, id: ObjectId) {
    const existing = await this.events.findById(id)
    if (!existing) throw new Error("Event not found")
    if (existing.organizerId.toHexString() !== organizerId.toHexString()) throw new Error("Forbidden")
    const ok = await this.events.delete(id)
    if (!ok) throw new Error("Delete failed")
  }

  async get(id: ObjectId) {
    const e = await this.events.findById(id)
    if (!e) throw new Error("Event not found")
    return e
  }

  async list() {
    return this.events.list()
  }
}
