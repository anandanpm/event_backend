"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stripe = exports.STRIPE_WEBHOOK_SECRET = void 0;
// config/stripe.ts
const stripe_1 = __importDefault(require("stripe"));
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
exports.STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET;
if (!STRIPE_SECRET_KEY) {
    throw new Error("STRIPE_SECRET_KEY is required");
}
if (!exports.STRIPE_WEBHOOK_SECRET) {
    console.warn("⚠️  STRIPE_WEBHOOK_SECRET is not configured - webhooks will fail");
}
exports.stripe = new stripe_1.default(STRIPE_SECRET_KEY, {
    apiVersion: "2025-08-27.basil",
});
console.log("[Stripe] Configuration:");
console.log("[Stripe] Secret Key configured:", !!STRIPE_SECRET_KEY);
console.log("[Stripe] Webhook Secret configured:", !!exports.STRIPE_WEBHOOK_SECRET);
if (exports.STRIPE_WEBHOOK_SECRET) {
    console.log("[Stripe] Webhook Secret starts with:", exports.STRIPE_WEBHOOK_SECRET.substring(0, 8) + "...");
}
//# sourceMappingURL=stripe.js.map