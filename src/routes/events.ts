import { Router } from "express"
import { container } from "tsyringe"
import { EventController } from "../controllers/EventController"
import { auth } from "../middleware/auth"
import { validateBody } from "../middleware/validation"
import { CreateEventDto } from "../dto/event/CreateEventDto"
import { UpdateEventDto } from "../dto/event/UpdateEventDto"

const router = Router()
const controller = container.resolve(EventController)

router.get("/", controller.list)
router.get("/:id", controller.get)
router.post("/", auth(["admin", "user"]), validateBody(CreateEventDto), controller.create)
router.put("/:id", auth(["admin", "user"]), validateBody(UpdateEventDto), controller.update)
router.delete("/:id", auth(["admin", "user"]), controller.delete)

export default router
