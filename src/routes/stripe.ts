import { Router } from "express"
import bodyParser from "body-parser"
import { StripeWebhookController } from "../controllers/StripeWebhookController"

const router = Router()

router.post("/webhook", bodyParser.raw({ type: "application/json" }), StripeWebhookController.handle)

export default router
