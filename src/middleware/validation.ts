import type { NextFunction, Request, Response } from "express"
import { validate } from "class-validator"

export function validateBody(DtoClass: new () => any) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const dto = new DtoClass()
    Object.assign(dto, req.body)
    const errors = await validate(dto as object, { whitelist: true })
    if (errors.length > 0) {
      return res.status(400).json({ message: "Validation failed", errors })
    }
    next()
  }
}
