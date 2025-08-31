import { Router } from "express"
import { container } from "tsyringe"
import { BookingController } from "../controllers/BookingController"
import { auth } from "../middleware/auth"
import { validateBody } from "../middleware/validation"
import { CreateBookingDto } from "../dto/booking/CreateBookingDto"

const router = Router()
const controller = container.resolve(BookingController)

router.get("/me", auth(["user", "admin"]), controller.listMine)
router.post("/", auth(["user", "admin"]), validateBody(CreateBookingDto), controller.create)

export default router
