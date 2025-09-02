import { injectable } from "tsyringe"
import { AppDataSource } from "../config/database"
import { Booking } from "../models/Booking"
import type { MongoRepository } from "typeorm"
import { ObjectId } from "mongodb"
import { IBookingRepository } from "../interfaces/repositories/IBookingRepository"

@injectable()
export class BookingRepository implements IBookingRepository {
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
    try {
      console.log(`[BookingRepository] Searching for booking with paymentIntentId: ${paymentIntentId}`)
      
      const booking = await this.repo.findOne({ 
        where: { paymentIntentId } as any 
      })
      
      if (booking) {
        console.log(`[BookingRepository] Found booking ${booking.id} for paymentIntentId: ${paymentIntentId}`)
      } else {
        console.log(`[BookingRepository] No booking found for paymentIntentId: ${paymentIntentId}`)
      }
      
      return booking
    } catch (error) {
      console.error(`[BookingRepository] Error finding booking by paymentIntentId ${paymentIntentId}:`, error)
      throw error
    }
  }

async listByUser(userId: ObjectId) {
  return this.repo.find({
    where: {
      userId: userId
    }
  });
}






}
