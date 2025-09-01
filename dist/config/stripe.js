"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.STRIPE_WEBHOOK_SECRET = exports.stripe = void 0;
const stripe_1 = __importDefault(require("stripe"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
exports.stripe = new stripe_1.default(STRIPE_SECRET_KEY, {
    apiVersion: '2024-12-18.acacia',
});
exports.STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET || "";
//# sourceMappingURL=stripe.js.map