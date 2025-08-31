import { Entity, ObjectIdColumn, Column } from "typeorm"
import type { ObjectId } from "mongodb"

@Entity("events")
export class Event {
  @ObjectIdColumn()
  id!: ObjectId

  @Column()
  title!: string

  @Column()
  description!: string

  @Column()
  location!: string

  @Column()
  date!: Date

  @Column()
  organizerId!: ObjectId

  @Column()
  createdAt!: Date

  @Column()
  updatedAt!: Date
}
