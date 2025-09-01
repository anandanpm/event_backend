import { inject, injectable } from "tsyringe"
import type { Request, Response, NextFunction } from "express"
import { IAuthService } from "../interfaces/services/IAuthService"
import { UserMapper } from "../mappers/UserMapper"

@injectable()
export class AuthController {
  constructor( @inject("AuthService") private auth: IAuthService ) {}

  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, email, password } = req.body
      console.log(name,email,password,'req.body is comming');
      const { user, token } = await this.auth.register(name, email, password)
      console.log(user,token,'user,token');

      res.json({ ...UserMapper.toSafe(user), token })
    } catch (err) {
      next(err)
    }
  }

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body
      console.log(email,password,'req.body is comming');
      const { user, token } = await this.auth.login(email, password)
      console.log(user,token,'user,token from the login');

      res.json({ ...UserMapper.toSafe(user), token })
    } catch (err) {
      next(err)
    }
  }
}
