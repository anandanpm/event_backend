import { Entity, ObjectIdColumn, Column } from "typeorm"
import type { ObjectId } from "mongodb"

@Entity("tickets")
export class Ticket {
  @ObjectIdColumn()
  id!: ObjectId

  @Column()
  eventId!: ObjectId

  @Column()
  name!: string

  @Column()
  priceCents!: number

  @Column()
  totalQuantity!: number

  @Column()
  remainingQuantity!: number

  @Column()
  createdAt!: Date

  @Column()
  updatedAt!: Date
}
