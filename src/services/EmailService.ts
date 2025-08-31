import { injectable } from "tsyringe"
import { getEmailTransporter } from "../config/email"

@injectable()
export class EmailService {
  async send(to: string, subject: string, html: string) {
    const transporter = getEmailTransporter()
    await transporter.sendMail({
      from: process.env.MAIL_FROM || "no-reply@example.com",
      to,
      subject,
      html,
    })
  }
}
