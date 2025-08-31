import { inject, injectable } from "tsyringe"
import bcrypt from "bcrypt"
import { IUserRepository } from "../interfaces/repositories/IUserRepository"
import { signJwt } from "../utils/jwt"
import type { User } from "../models/User"
import { EmailService } from "./EmailService"

@injectable()
export class AuthService {
  constructor(
    @inject("UserRepository") private users: IUserRepository,
    @inject("EmailService") private mailer: EmailService
  ) {}

  async register(name: string, email: string, password: string) {
    const existing = await this.users.findByEmail(email.toLowerCase())
    if (existing) throw new Error("Email already in use")

    const passwordHash = await bcrypt.hash(password, 10)
    const now = new Date()
    const user: Partial<User> = {
      name,
      email: email.toLowerCase(),
      passwordHash,
      role: "user",
      createdAt: now,
      updatedAt: now,
    }

    const created = await this.users.create(user)
    const token = signJwt({ sub: created.id.toHexString(), role: created.role })


    await this.mailer.send(
      created.email,
      "Welcome to Event Management 🎉",
      `<h1>Hello ${created.name},</h1>
       <p>Thanks for registering! Your account has been created successfully.</p>
       <p>You can now log in and start booking events 🚀</p>`
    )

    return { user: created, token }
  }

  async login(email: string, password: string) {
    const user = await this.users.findByEmail(email.toLowerCase())
    if (!user) throw new Error("Invalid credentials")

    const ok = await bcrypt.compare(password, user.passwordHash)
    if (!ok) throw new Error("Invalid credentials")

    const token = signJwt({ sub: user.id.toHexString(), role: user.role })
    return { user, token }
  }
}
