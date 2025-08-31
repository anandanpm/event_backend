import type { ObjectId } from "mongodb"
export interface IUser {
  id?: ObjectId
  name: string
  email: string
  passwordHash: string
  role: "user" | "admin"
  createdAt: Date
  updatedAt: Date
}
