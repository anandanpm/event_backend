"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const StripeWebhookController_1 = require("../controllers/StripeWebhookController");
const router = (0, express_1.Router)();
// Custom middleware to ensure raw body for webhook
const rawBodyMiddleware = (req, res, next) => {
    console.log("[RawBodyMiddleware] Processing request...");
    console.log("[RawBodyMiddleware] Content-Type:", req.headers['content-type']);
    console.log("[RawBodyMiddleware] Body type before:", typeof req.body);
    console.log("[RawBodyMiddleware] Is Buffer before:", Buffer.isBuffer(req.body));
    if (req.headers['content-type'] === 'application/json' && req.method === 'POST') {
        let data = '';
        let bufferData = [];
        req.setEncoding('utf8');
        req.on('data', (chunk) => {
            if (Buffer.isBuffer(chunk)) {
                bufferData.push(chunk);
            }
            else {
                data += chunk;
            }
        });
        req.on('end', () => {
            try {
                if (bufferData.length > 0) {
                    req.body = Buffer.concat(bufferData);
                }
                else {
                    req.body = Buffer.from(data, 'utf8');
                }
                console.log("[RawBodyMiddleware] Set body as Buffer, length:", req.body.length);
                next();
            }
            catch (error) {
                console.error("[RawBodyMiddleware] Error processing body:", error);
                next(error);
            }
        });
        req.on('error', (error) => {
            console.error("[RawBodyMiddleware] Request error:", error);
            next(error);
        });
    }
    else {
        console.log("[RawBodyMiddleware] Skipping raw body processing");
        next();
    }
};
// Alternative 1: Using custom middleware
router.post("/webhook", rawBodyMiddleware, StripeWebhookController_1.StripeWebhookController.handle);
// Alternative 2: If the above doesn't work, try this simpler approach
// Comment out the above line and uncomment this:
// router.post("/webhook", (req, res, next) => {
//   console.log("[Webhook Route] Direct handling...")
//   console.log("[Webhook Route] Body type:", typeof req.body)
//   console.log("[Webhook Route] Is Buffer:", Buffer.isBuffer(req.body))
//   
//   // If body is already parsed as JSON, try to convert back
//   if (typeof req.body === 'object' && !Buffer.isBuffer(req.body)) {
//     console.log("[Webhook Route] Converting JSON back to Buffer...")
//     req.body = Buffer.from(JSON.stringify(req.body), 'utf8')
//   }
//   
//   StripeWebhookController.handle(req, res, next)
// })
exports.default = router;
//# sourceMappingURL=stripe.js.map