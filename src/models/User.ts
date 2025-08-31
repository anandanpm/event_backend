
import { Entity, ObjectIdColumn, Column } from "typeorm"
import type { ObjectId } from "mongodb"

@Entity("users")
export class User {
  @ObjectIdColumn()
  id!: ObjectId

  @Column()
  name!: string

  @Column()
  email!: string

  @Column()
  passwordHash!: string

  @Column()
  role!: "user" | "admin"

  @Column()
  createdAt!: Date

  @Column()
  updatedAt!: Date
}
