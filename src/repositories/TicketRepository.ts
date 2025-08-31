import { injectable } from "tsyringe"
import { AppDataSource } from "../config/database"
import { Ticket } from "../models/Ticket"
import type { MongoRepository } from "typeorm"
import type { ObjectId } from "mongodb"
import { ITicketRepository } from "../interfaces/repositories/ITicketRepository"

@injectable()
export class TicketRepository implements ITicketRepository {
  private repo: MongoRepository<Ticket>
  constructor() {
    this.repo = AppDataSource.getMongoRepository(Ticket)
  }

  async create(data: Partial<Ticket>) {
    const doc = this.repo.create(data)
    return this.repo.save(doc)
  }

  async update(id: ObjectId, data: Partial<Ticket>) {
    await this.repo.update(id, data)
    return this.findById(id)
  }

  async findById(id: ObjectId) {
    return this.repo.findOne({ where: { _id: id } })
  }

  async listByEvent(eventId: ObjectId) {
    return this.repo.find({ where: { eventId } })
  }
}
