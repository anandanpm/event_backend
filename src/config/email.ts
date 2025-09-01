import nodemailer from "nodemailer"
import type { Transporter } from "nodemailer"
import dotenv from "dotenv"
dotenv.config()

const EMAIL_USER = process.env.EMAIL_USER
const EMAIL_PASS = process.env.EMAIL_PASS

export const transporter: Transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
})
