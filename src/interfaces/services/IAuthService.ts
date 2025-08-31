import type { User } from "../../models/User"
export interface IAuthService {
  register(name: string, email: string, password: string): Promise<{ user: User; token: string }>
  login(email: string, password: string): Promise<{ user: User; token: string }>
}
