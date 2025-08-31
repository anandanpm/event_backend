import { Entity, ObjectIdColumn, Column } from "typeorm"
import type { ObjectId } from "mongodb"

export type BookingStatus = "pending" | "paid" | "failed" | "cancelled"

@Entity("bookings")
export class Booking {
  @ObjectIdColumn()
  id!: ObjectId

  @Column()
  userId!: ObjectId

  @Column()
  eventId!: ObjectId

  @Column()
  ticketId!: ObjectId

  @Column()
  quantity!: number

  @Column()
  amountCents!: number

  @Column()
  paymentIntentId!: string

  @Column()
  status!: BookingStatus

  @Column()
  createdAt!: Date

  @Column()
  updatedAt!: Date
}
