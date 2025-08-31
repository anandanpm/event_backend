import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "../models/User"

const MONGO_URL = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/event_management"

export const AppDataSource = new DataSource({
  type: "mongodb",
  url: MONGO_URL,
  entities: [User],
  synchronize: true, // For dev/demo. Use migrations in production.
  logging: false,
})
