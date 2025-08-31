import { Router } from "express"
import { container } from "tsyringe"
import { AuthController } from "../controllers/AuthController"
import { validateBody } from "../middleware/validation"
import { RegisterDto } from "../dto/auth/RegisterDto"
import { LoginDto } from "../dto/auth/LoginDto"

const router = Router()
const controller = container.resolve(AuthController)

router.post("/register", validateBody(RegisterDto), controller.register)
router.post("/login", validateBody(LoginDto), controller.login)

export default router
