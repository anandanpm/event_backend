"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StripeWebhookController = void 0;
const stripe_1 = require("../config/stripe");
const tsyringe_1 = require("tsyringe");
const BookingService_1 = require("../services/BookingService");
class StripeWebhookController {
    static async handle(req, res) {
        console.log("[StripeWebhook] =================================");
        console.log("[StripeWebhook] Received webhook request");
        const sig = req.headers["stripe-signature"];
        let event;
        res.json({ received: true });
        try {
            if (sig && stripe_1.STRIPE_WEBHOOK_SECRET) {
                event = stripe_1.stripe.webhooks.constructEvent(req.body, sig, stripe_1.STRIPE_WEBHOOK_SECRET);
                console.log(`[StripeWebhook] ✅ Signature verified. Event type: ${event.type}`);
            }
            else {
                throw new Error("Stripe signature missing or webhook secret not configured");
            }
        }
        catch (err) {
            console.warn(`[StripeWebhook] ❌ Signature verification failed: ${err.message}`);
            try {
                event = JSON.parse(req.body.toString());
                console.log(`[StripeWebhook] ⚠️ Proceeding without signature verification. Event type: ${event.type}`);
            }
            catch {
                console.error("[StripeWebhook] Cannot parse body, skipping BookingService");
                return;
            }
        }
        try {
            if (event.type === "payment_intent.succeeded") {
                const paymentIntent = event.data?.object;
                if (!paymentIntent?.id) {
                    console.error("[StripeWebhook] PaymentIntent ID missing, cannot process booking");
                    return;
                }
                const bookingService = tsyringe_1.container.resolve(BookingService_1.BookingService);
                await bookingService.handlePaymentSucceeded(paymentIntent.id);
                console.log(`[StripeWebhook] BookingService processed payment for: ${paymentIntent.id}`);
            }
            else {
                console.log(`[StripeWebhook] Ignored webhook event type: ${event.type}`);
            }
        }
        catch (err) {
            console.error(`[StripeWebhook] Error processing BookingService:`, err);
        }
    }
}
exports.StripeWebhookController = StripeWebhookController;
//# sourceMappingURL=StripeWebhookController.js.map