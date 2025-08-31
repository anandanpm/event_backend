import jwt, { Secret, SignOptions } from "jsonwebtoken";

const JWT_SECRET: Secret = process.env.JWT_SECRET || "dev_secret";
const JWT_EXPIRES_IN = (process.env.JWT_EXPIRES_IN || "7d") as SignOptions["expiresIn"];

export function signJwt(payload: object) {
  const options: SignOptions = { expiresIn: JWT_EXPIRES_IN};
  return jwt.sign(payload, JWT_SECRET, options);
}

export function verifyJwt(token: string) {
  return jwt.verify(token, JWT_SECRET);
}
