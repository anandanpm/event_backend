import type { Request, Response } from "express"
import { STRIPE_WEBHOOK_SECRET, stripe } from "../config/stripe"
import { container } from "tsyringe"
import { BookingService } from "../services/BookingService"

export class StripeWebhookController {
  static async handle(req: Request, res: Response) {
    const sig = req.headers["stripe-signature"]
    if (!sig || Array.isArray(sig)) {
      return res.status(400).send("Missing stripe signature")
    }
    let event
    try {
      event = stripe.webhooks.constructEvent(req.body, sig, STRIPE_WEBHOOK_SECRET)
    } catch (err: any) {
      return res.status(400).send(`Webhook Error: ${err.message}`)
    }

    if (event.type === "payment_intent.succeeded") {
      const paymentIntent = event.data.object as any
      const service = container.resolve(BookingService)
      await service.handlePaymentSucceeded(paymentIntent.id)
    }

    res.json({ received: true })
  }
}
