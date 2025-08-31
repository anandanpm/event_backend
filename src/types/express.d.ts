import "express-serve-static-core"
declare global {
  namespace Express {
    interface Request {
      user?: { sub: string; role?: string }
      cookies?: Record<string, string>
    }
  }
}
