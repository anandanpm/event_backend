"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tsyringe_1 = require("tsyringe");
const TicketController_1 = require("../controllers/TicketController");
const auth_1 = require("../middleware/auth");
const validation_1 = require("../middleware/validation");
const CreateTicketDto_1 = require("../dto/ticket/CreateTicketDto");
const router = (0, express_1.Router)();
const controller = tsyringe_1.container.resolve(TicketController_1.TicketController);
router.get("/event/:eventId", controller.listByEvent.bind(controller));
router.get("/:id", controller.get.bind(controller));
router.post("/event/:eventId", (0, auth_1.auth)(["admin"]), (0, validation_1.validateBody)(CreateTicketDto_1.CreateTicketDto), controller.create.bind(controller));
exports.default = router;
//# sourceMappingURL=tickets.js.map