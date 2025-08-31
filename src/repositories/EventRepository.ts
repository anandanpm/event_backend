import { injectable } from "tsyringe"
import { AppDataSource } from "../config/database"
import { Event } from "../models/Event"
import type { MongoRepository } from "typeorm"
import type { ObjectId } from "mongodb"

@injectable()
export class EventRepository {
  private repo: MongoRepository<Event>
  constructor() {
    this.repo = AppDataSource.getMongoRepository(Event)
  }

  async create(data: Partial<Event>) {
    const doc = this.repo.create(data)
    return this.repo.save(doc)
  }

  async update(id: ObjectId, data: Partial<Event>) {
    await this.repo.update(id, data)
    return this.findById(id)
  }

  async delete(id: ObjectId) {
    const res = await this.repo.delete(id)
    return !!res.affected 
  }

  async findById(id: ObjectId) {
    return this.repo.findOne({ where: { _id: id } })
  }

  async list() {
    return this.repo.find({ order: { date: 1 as any } })
  }

  async listByOrganizer(organizerId: ObjectId) {
    return this.repo.find({ where: { organizerId } })
  }
}
