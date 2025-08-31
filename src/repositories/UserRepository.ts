import { injectable } from "tsyringe"
import { AppDataSource } from "../config/database"
import { User } from "../models/User"
import type { MongoRepository } from "typeorm"
import type { ObjectId } from "mongodb"

@injectable()
export class UserRepository {
  private repo: MongoRepository<User>
  constructor() {
    this.repo = AppDataSource.getMongoRepository(User)
  }

  async findByEmail(email: string) {
    return this.repo.findOne({ where: { email } })
  }

  async findById(id: ObjectId) {
    return this.repo.findOne({ where: { _id: id } })
  }

  async create(data: Partial<User>) {
    const doc = this.repo.create(data)
    return this.repo.save(doc)
  }
}
