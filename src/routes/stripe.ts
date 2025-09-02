import { Router } from "express"
import express from "express"
import { StripeWebhookController } from "../controllers/StripeWebhookController"

const router = Router()

router.post(
  "/webhook", 
  express.raw({ 
    type: "application/json",
    limit: "50mb"
  }), 
  StripeWebhookController.handle
)

export default router
