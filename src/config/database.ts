import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "../models/User"
import { Ticket } from "../models/Ticket"
import { Event } from "../models/Event"
import { Booking } from "../models/Booking"
import dotenv from "dotenv"
dotenv.config()

const MONGO_URL = process.env.MONGO_URL 
export const AppDataSource = new DataSource({
  type: "mongodb",
  url: MONGO_URL,
  entities: [User,Ticket,Event,Booking],
  logging: false,
})
