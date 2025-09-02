"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_2 = __importDefault(require("express"));
const StripeWebhookController_1 = require("../controllers/StripeWebhookController");
const router = (0, express_1.Router)();
router.post("/webhook", express_2.default.raw({
    type: "application/json",
    limit: "50mb"
}), StripeWebhookController_1.StripeWebhookController.handle);
exports.default = router;
//# sourceMappingURL=stripe.js.map