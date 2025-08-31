import { injectable } from "tsyringe"
import bcrypt from "bcrypt"
import type { UserRepository } from "../repositories/UserRepository"
import { signJwt } from "../utils/jwt"
import type { User } from "../models/User"

@injectable()
export class AuthService {
  constructor(private users: UserRepository) {}

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
