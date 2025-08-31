import type { ObjectId } from "mongodb"
import type { User } from "../../models/User"

export interface IUserRepository {
  findByEmail(email: string): Promise<User | null>
  findById(id: ObjectId): Promise<User | null>
  create(user: Partial<User>): Promise<User>
}

