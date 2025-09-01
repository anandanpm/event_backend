"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const body_parser_1 = require("body-parser");
const tsyringe_1 = require("tsyringe");
const container_1 = require("./config/container");
const database_1 = require("./config/database");
const errorHandler_1 = require("./middleware/errorHandler");
const PORT = process.env.PORT;
async function bootstrap() {
    try {
        (0, container_1.initContainer)(tsyringe_1.container);
        await database_1.AppDataSource.initialize();
        console.log("[startup] database connected");
        const app = (0, express_1.default)();
        app.use((0, cors_1.default)({
            origin: [process.env.LOCALHOST, process.env.FRONTEND_URL],
            credentials: true,
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
            allowedHeaders: ['Content-Type', 'Authorization'],
        }));
        app.use((0, cookie_parser_1.default)());
        const stripeRoutes = (await Promise.resolve().then(() => __importStar(require("./routes/stripe")))).default;
        app.use("/api/stripe", stripeRoutes);
        app.use((0, body_parser_1.json)());
        app.use((0, body_parser_1.urlencoded)({ extended: true }));
        app.get("/health", (_req, res) => res.json({ status: "ok" }));
        const authRoutes = (await Promise.resolve().then(() => __importStar(require("./routes/auth")))).default;
        const eventRoutes = (await Promise.resolve().then(() => __importStar(require("./routes/events")))).default;
        const ticketRoutes = (await Promise.resolve().then(() => __importStar(require("./routes/tickets")))).default;
        const bookingRoutes = (await Promise.resolve().then(() => __importStar(require("./routes/booking")))).default;
        app.use("/api/auth", authRoutes);
        app.use("/api/events", eventRoutes);
        app.use("/api/tickets", ticketRoutes);
        app.use("/api/bookings", bookingRoutes);
        app.use(errorHandler_1.errorHandler);
        app.listen(PORT, () => {
            console.log(`[startup] server running on port ${PORT}`);
        });
    }
    catch (err) {
        console.error("[startup] failed to start app", err);
        process.exit(1);
    }
}
bootstrap();
//# sourceMappingURL=app.js.map