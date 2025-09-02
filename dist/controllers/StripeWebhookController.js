"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StripeWebhookController = void 0;
const stripe_1 = require("../config/stripe");
const tsyringe_1 = require("tsyringe");
const BookingService_1 = require("../services/BookingService");
class StripeWebhookController {
    static async handle(req, res) {
        console.log("[StripeWebhook] Received webhook request");
        const sig = req.headers["stripe-signature"];
        if (!sig || Array.isArray(sig)) {
            console.error("[StripeWebhook] Missing or invalid stripe signature");
            return res.status(400).send("Missing stripe signature");
        }
        let event;
        try {
            event = stripe_1.stripe.webhooks.constructEvent(req.body, sig, stripe_1.STRIPE_WEBHOOK_SECRET);
            console.log(`[StripeWebhook] Successfully constructed webhook event: ${event.type}`);
        }
        catch (err) {
            console.error(`[StripeWebhook] Webhook signature verification failed:`, err.message);
            return res.status(400).send(`Webhook Error: ${err.message}`);
        }
        try {
            if (event.type === "payment_intent.succeeded") {
                const paymentIntent = event.data.object;
                console.log(`[StripeWebhook] Processing payment_intent.succeeded for: ${paymentIntent.id}`);
                const bookingService = tsyringe_1.container.resolve(BookingService_1.BookingService);
                await bookingService.handlePaymentSucceeded(paymentIntent.id);
                console.log(`[StripeWebhook] Successfully processed payment_intent.succeeded for: ${paymentIntent.id}`);
            }
            else {
                console.log(`[StripeWebhook] Ignoring webhook event type: ${event.type}`);
            }
            res.json({ received: true });
        }
        catch (error) {
            console.error(`[StripeWebhook] Error processing webhook event:`, error);
            // Return 500 so Stripe will retry the webhook
            res.status(500).json({
                error: "Internal server error processing webhook",
                received: false
            });
        }
    }
}
exports.StripeWebhookController = StripeWebhookController;
//# sourceMappingURL=StripeWebhookController.js.map