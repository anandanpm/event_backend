import { Router } from "express"
import { container } from "tsyringe"
import { EventController } from "../controllers/EventController"
import { auth } from "../middleware/auth"
import { validateBody } from "../middleware/validation"
import { CreateEventDto } from "../dto/event/CreateEventDto"
import { UpdateEventDto } from "../dto/event/UpdateEventDto"

const router = Router()
const controller = container.resolve(EventController)

router.get("/", controller.list.bind(controller))
router.get("/:id", controller.get.bind(controller))
router.post(
  "/", 
  auth(["admin"]), 
  validateBody(CreateEventDto), 
  controller.create.bind(controller)
)
router.put(
  "/:id", 
  auth(["admin"]), 
  validateBody(UpdateEventDto), 
  controller.update.bind(controller)
)
router.delete(
  "/:id", 
  auth(["admin"]), 
  controller.delete.bind(controller)
)

export default router
