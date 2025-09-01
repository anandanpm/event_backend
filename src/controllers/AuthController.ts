import { inject, injectable } from "tsyringe"
import type { Request, Response, NextFunction } from "express"
import { IAuthService } from "../interfaces/services/IAuthService"
import { UserMapper } from "../mappers/UserMapper"

@injectable()
export class AuthController {
  constructor(@inject("AuthService") private auth: IAuthService) { }

  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, email, password } = req.body

      const { user, token } = await this.auth.register(name, email, password)


      res.json({ ...UserMapper.toSafe(user), token })
    } catch (err) {
      next(err)
    }
  }

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body

      const { user, token } = await this.auth.login(email, password)


      res.json({ ...UserMapper.toSafe(user), token })
    } catch (err) {
      next(err)
    }
  }
}
