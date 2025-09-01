"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tsyringe_1 = require("tsyringe");
const AuthController_1 = require("../controllers/AuthController");
const validation_1 = require("../middleware/validation");
const RegisterDto_1 = require("../dto/auth/RegisterDto");
const LoginDto_1 = require("../dto/auth/LoginDto");
const router = (0, express_1.Router)();
const controller = tsyringe_1.container.resolve(AuthController_1.AuthController);
router.post("/register", (0, validation_1.validateBody)(RegisterDto_1.RegisterDto), controller.register.bind(controller));
router.post("/login", (0, validation_1.validateBody)(LoginDto_1.LoginDto), controller.login.bind(controller));
exports.default = router;
//# sourceMappingURL=auth.js.map