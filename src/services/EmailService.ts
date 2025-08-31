import { injectable } from "tsyringe"
import { transporter } from "../config/email"  

@injectable()
export class EmailService {
  async send(to: string, subject: string, html: string) {
    await transporter.sendMail({
      from: process.env.MAIL_FROM || process.env.EMAIL_USER || "no-reply@example.com",
      to,
      subject,
      html,
    })
  }
}
