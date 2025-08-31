import type { Request, Response, NextFunction } from "express"
import { verifyJwt } from "../utils/jwt"

export function auth(requiredRoles: Array<"user" | "admin"> = ["user", "admin"]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization || ""
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : ""
    if (!token) return res.status(401).json({ message: "Unauthorized" })
    try {
      const payload = verifyJwt(token)
      if (!requiredRoles.includes(payload.role)) return res.status(403).json({ message: "Forbidden" })
      ;(req as any).user = payload
      next()
    } catch {
      res.status(401).json({ message: "Unauthorized" })
    }
  }
}
