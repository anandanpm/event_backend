import { Request, Response, NextFunction } from "express";
import { verifyJwt } from "../utils/jwt";
type UserPayload = { id: string; role: string };

export function auth(allowedRoles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        return res.status(401).json({ message: "No token provided" });
      }

      const token = authHeader.split(" ")[1];
      const payload = verifyJwt<any>(token);

      if (!payload) {
        return res.status(401).json({ message: "Invalid token" });
      }

      // Map JWT "sub" → "id"
      const userPayload: UserPayload = {
        id: payload.sub,   // 👈 fix here
        role: payload.role,
      };

      if (!allowedRoles.includes(userPayload.role)) {
        return res.status(403).json({ message: "Forbidden" });
      }

      (req as any).user = userPayload;
      next();
    } catch (err) {
      return res.status(401).json({ message: "Unauthorized" });
    }
  };
}
