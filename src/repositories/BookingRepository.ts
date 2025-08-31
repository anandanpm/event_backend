import { injectable } from "tsyringe"
import { AppDataSource } from "../config/database"
import { Booking } from "../models/Booking"
import type { MongoRepository } from "typeorm"
import type { ObjectId } from "mongodb"

@injectable()
export class BookingRepository {
  private repo: MongoRepository<Booking>
  constructor() {
    this.repo = AppDataSource.getMongoRepository(Booking)
  }

  async create(data: Partial<Booking>) {
    const doc = this.repo.create(data)
    return this.repo.save(doc)
  }

  async update(id: ObjectId, data: Partial<Booking>) {
    await this.repo.update(id, data)
    return this.findById(id)
  }

  async findById(id: ObjectId) {
    return this.repo.findOne({ where: { _id: id } })
  }

  async findByPaymentIntent(paymentIntentId: string) {
    return this.repo.findOne({ where: { paymentIntentId } as any })
  }

  async listByUser(userId: ObjectId) {
    return this.repo.find({ where: { userId }, order: { createdAt: -1 as any } })
  }
}
