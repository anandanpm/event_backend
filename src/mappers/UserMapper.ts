import type { User } from "../models/User"

export const UserMapper = {
  toSafe(user: User) {
    return {
      id: user.id.toHexString(),
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
    }
  },
}
