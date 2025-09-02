import Stripe from "stripe"

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY
export const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET

if (!STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is required")
}

if (!STRIPE_WEBHOOK_SECRET) {
  console.warn("⚠️  STRIPE_WEBHOOK_SECRET is not configured - webhooks will fail")
}

export const stripe = new Stripe(STRIPE_SECRET_KEY, {
  apiVersion: "2025-08-27.basil", 
})

console.log("[Stripe] Configuration:")
console.log("[Stripe] Secret Key configured:", !!STRIPE_SECRET_KEY)
console.log("[Stripe] Webhook Secret configured:", !!STRIPE_WEBHOOK_SECRET)
if (STRIPE_WEBHOOK_SECRET) {
  console.log("[Stripe] Webhook Secret starts with:", STRIPE_WEBHOOK_SECRET.substring(0, 8) + "...")
}