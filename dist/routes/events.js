"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tsyringe_1 = require("tsyringe");
const EventController_1 = require("../controllers/EventController");
const auth_1 = require("../middleware/auth");
const validation_1 = require("../middleware/validation");
const CreateEventDto_1 = require("../dto/event/CreateEventDto");
const UpdateEventDto_1 = require("../dto/event/UpdateEventDto");
const router = (0, express_1.Router)();
const controller = tsyringe_1.container.resolve(EventController_1.EventController);
router.get("/", controller.list.bind(controller));
router.get("/:id", controller.get.bind(controller));
router.post("/", (0, auth_1.auth)(["admin"]), (0, validation_1.validateBody)(CreateEventDto_1.CreateEventDto), controller.create.bind(controller));
router.put("/:id", (0, auth_1.auth)(["admin"]), (0, validation_1.validateBody)(UpdateEventDto_1.UpdateEventDto), controller.update.bind(controller));
router.delete("/:id", (0, auth_1.auth)(["admin"]), controller.delete.bind(controller));
exports.default = router;
//# sourceMappingURL=events.js.map