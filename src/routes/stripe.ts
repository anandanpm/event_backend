import { Router, Request, Response } from "express"
import express from 'express'
import { StripeWebhookController } from "../controllers/StripeWebhookController"

const router = Router()

router.post(
  "/webhook", 
  express.raw({ type: "application/json" }), 
  StripeWebhookController.handle
)
export default router