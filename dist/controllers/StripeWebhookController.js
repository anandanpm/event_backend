"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StripeWebhookController = void 0;
const stripe_1 = require("../config/stripe");
const tsyringe_1 = require("tsyringe");
const BookingService_1 = require("../services/BookingService");
class StripeWebhookController {
    static async handle(req, res) {
        const sig = req.headers["stripe-signature"];
        if (!sig || Array.isArray(sig)) {
            return res.status(400).send("Missing stripe signature");
        }
        let event;
        try {
            event = stripe_1.stripe.webhooks.constructEvent(req.body, sig, stripe_1.STRIPE_WEBHOOK_SECRET);
        }
        catch (err) {
            return res.status(400).send(`Webhook Error: ${err.message}`);
        }
        if (event.type === "payment_intent.succeeded") {
            const paymentIntent = event.data.object;
            const service = tsyringe_1.container.resolve(BookingService_1.BookingService);
            await service.handlePaymentSucceeded(paymentIntent.id);
        }
        res.json({ received: true });
    }
}
exports.StripeWebhookController = StripeWebhookController;
//# sourceMappingURL=StripeWebhookController.js.map