import type { Request, Response, NextFunction } from "express"

export function errorHandler(err: any, _req: Request, res: Response, _next: NextFunction) {
  const status = err.status || 400
  const message = err.message || "Unexpected error"
  if (process.env.NODE_ENV !== "test") {
    console.error("[error]", err)
  }
  res.status(status).json({ message })
}
