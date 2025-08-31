import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "../models/User"
import { Ticket } from "../models/Ticket"
import { Event } from "../models/Event"
import { Booking } from "../models/Booking"

const MONGO_URL = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/event_management"

export const AppDataSource = new DataSource({
  type: "mongodb",
  url: MONGO_URL,
  entities: [User,Ticket,Event,Booking],
  logging: false,
})
