"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const tsyringe_1 = require("tsyringe");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt_1 = require("../utils/jwt");
let AuthService = class AuthService {
    constructor(users, mailer) {
        this.users = users;
        this.mailer = mailer;
    }
    async register(name, email, password) {
        const existing = await this.users.findByEmail(email.toLowerCase());
        if (existing)
            throw new Error("Email already in use");
        const passwordHash = await bcrypt_1.default.hash(password, 10);
        const now = new Date();
        const user = {
            name,
            email: email.toLowerCase(),
            passwordHash,
            role: "user",
            createdAt: now,
            updatedAt: now,
        };
        const created = await this.users.create(user);
        const token = (0, jwt_1.signJwt)({ sub: created.id.toString(), role: created.role });
        await this.mailer.send(created.email, "Welcome to Event Management 🎉", `<h1>Hello ${created.name},</h1>
       <p>Thanks for registering! Your account has been created successfully.</p>
       <p>You can now log in and start booking events 🚀</p>`);
        return { user: created, token };
    }
    async login(email, password) {
        const user = await this.users.findByEmail(email.toLowerCase());
        if (!user)
            throw new Error("Invalid credentials");
        const ok = await bcrypt_1.default.compare(password, user.passwordHash);
        if (!ok)
            throw new Error("Invalid credentials");
        const token = (0, jwt_1.signJwt)({ sub: user.id.toString(), role: user.role });
        return { user, token };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("UserRepository")),
    __param(1, (0, tsyringe_1.inject)("EmailService")),
    __metadata("design:paramtypes", [Object, Object])
], AuthService);
//# sourceMappingURL=AuthService.js.map