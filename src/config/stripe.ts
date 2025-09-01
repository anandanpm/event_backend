import Stripe from "stripe"
import dotenv from "dotenv"
dotenv.config()

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY as string

export const stripe = new Stripe(STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
})

export const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET || ""
