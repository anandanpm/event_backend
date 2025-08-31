import { Router } from "express"
import { container } from "tsyringe"
import { TicketController } from "../controllers/TicketController"
import { auth } from "../middleware/auth"
import { validateBody } from "../middleware/validation"
import { CreateTicketDto } from "../dto/ticket/CreateTicketDto"

const router = Router()
const controller = container.resolve(TicketController)

router.get("/event/:eventId", controller.listByEvent.bind(controller))
router.get("/:id", controller.get.bind(controller))
router.post(
  "/event/:eventId",
  auth(["admin", "user"]),
  validateBody(CreateTicketDto),
  controller.create.bind(controller)
)

export default router
