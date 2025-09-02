import type { Request, Response } from "express"
import { STRIPE_WEBHOOK_SECRET, stripe } from "../config/stripe"
import { container } from "tsyringe"
import { BookingService } from "../services/BookingService"

export class StripeWebhookController {
  static async handle(req: Request, res: Response) {
    console.log("[StripeWebhook] =================================")
    console.log("[StripeWebhook] Received webhook request")

    const sig = req.headers["stripe-signature"]
    let event: any

    res.json({ received: true })

    try {
      if (sig && STRIPE_WEBHOOK_SECRET) {
        event = stripe.webhooks.constructEvent(req.body, sig, STRIPE_WEBHOOK_SECRET)
        console.log(`[StripeWebhook] ✅ Signature verified. Event type: ${event.type}`)
      } else {
        throw new Error("Stripe signature missing or webhook secret not configured")
      }
    } catch (err: any) {
      console.warn(`[StripeWebhook] ❌ Signature verification failed: ${err.message}`)
      try {
        event = JSON.parse(req.body.toString())
        console.log(`[StripeWebhook] ⚠️ Proceeding without signature verification. Event type: ${event.type}`)
      } catch {
        console.error("[StripeWebhook] Cannot parse body, skipping BookingService")
        return
      }
    }
    try {
      if (event.type === "payment_intent.succeeded") {
        const paymentIntent = event.data?.object
        if (!paymentIntent?.id) {
          console.error("[StripeWebhook] PaymentIntent ID missing, cannot process booking")
          return
        }

        const bookingService = container.resolve(BookingService)
        await bookingService.handlePaymentSucceeded(paymentIntent.id)
        console.log(`[StripeWebhook] BookingService processed payment for: ${paymentIntent.id}`)
      } else {
        console.log(`[StripeWebhook] Ignored webhook event type: ${event.type}`)
      }
    } catch (err) {
      console.error(`[StripeWebhook] Error processing BookingService:`, err)
    }
  }
}
