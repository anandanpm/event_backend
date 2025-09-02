"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tsyringe_1 = require("tsyringe");
const BookingController_1 = require("../controllers/BookingController");
const auth_1 = require("../middleware/auth");
const validation_1 = require("../middleware/validation");
const CreateBookingDto_1 = require("../dto/booking/CreateBookingDto");
const router = (0, express_1.Router)();
const controller = tsyringe_1.container.resolve(BookingController_1.BookingController);
router.get("/me", (0, auth_1.auth)(["user", "admin"]), controller.listMine.bind(controller));
router.post("/", (0, auth_1.auth)(["user", "admin"]), (0, validation_1.validateBody)(CreateBookingDto_1.CreateBookingDto), controller.create.bind(controller));
router.get("/by-payment-intent/:paymentIntentId", controller.findByPaymentIntent.bind(controller));
exports.default = router;
//# sourceMappingURL=booking.js.map