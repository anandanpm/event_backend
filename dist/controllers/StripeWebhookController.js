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
        // CRITICAL DEBUG INFO
        console.log("[StripeWebhook] Request body type:", typeof req.body);
        console.log("[StripeWebhook] Request body constructor:", req.body?.constructor?.name);
        console.log("[StripeWebhook] Request body is Buffer:", Buffer.isBuffer(req.body));
        console.log("[StripeWebhook] Request body length:", req.body?.length || 'N/A');
        console.log("[StripeWebhook] Content-Type header:", req.headers['content-type']);
        console.log("[StripeWebhook] Request method:", req.method);
        console.log("[StripeWebhook] Request URL:", req.url);
        // Check if body looks like parsed JSON
        if (typeof req.body === 'object' && !Buffer.isBuffer(req.body)) {
            console.error("[StripeWebhook] ❌ BODY IS PARSED JSON, NOT RAW BUFFER!");
            console.log("[StripeWebhook] Body preview:", JSON.stringify(req.body).substring(0, 100));
        }
        const sig = req.headers["stripe-signature"];
        console.log("[StripeWebhook] Stripe signature present:", !!sig);
        console.log("[StripeWebhook] Webhook secret configured:", !!stripe_1.STRIPE_WEBHOOK_SECRET);
        if (!sig || Array.isArray(sig)) {
            console.error("[StripeWebhook] Missing or invalid stripe signature");
            return res.status(400).send("Missing stripe signature");
        }
        if (!stripe_1.STRIPE_WEBHOOK_SECRET) {
            console.error("[StripeWebhook] Webhook secret not configured");
            return res.status(500).send("Webhook secret not configured");
        }
        // Show signature details for debugging
        console.log("[StripeWebhook] Signature header:", sig.substring(0, 50) + "...");
        let event;
        try {
            console.log("[StripeWebhook] Attempting to construct webhook event...");
            event = stripe_1.stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
            console.log(`[StripeWebhook] ✅ Successfully constructed webhook event: ${event.type}`);
        }
        catch (err) {
            console.error(`[StripeWebhook] ❌ Webhook signature verification failed:`);
            console.error(`[StripeWebhook] Error message: ${err.message}`);
            console.error(`[StripeWebhook] Error type: ${err.type}`);
            console.error(`[StripeWebhook] Error code: ${err.code}`);
            // Additional debugging
            if (req.body && typeof req.body === 'string') {
                console.log("[StripeWebhook] Body is string, length:", req.body.length);
            }
            if (Buffer.isBuffer(req.body)) {
                console.log("[StripeWebhook] Body is Buffer, converting to string for signature...");
            }
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
            res.status(500).json({
                error: "Internal server error processing webhook",
                received: false
            });
        }
    }
}
exports.StripeWebhookController = StripeWebhookController;
//# sourceMappingURL=StripeWebhookController.js.map