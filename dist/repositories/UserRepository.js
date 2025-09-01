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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const tsyringe_1 = require("tsyringe");
const database_1 = require("../config/database");
const User_1 = require("../models/User");
let UserRepository = class UserRepository {
    constructor() {
        this.repo = database_1.AppDataSource.getMongoRepository(User_1.User);
    }
    async findByEmail(email) {
        return this.repo.findOne({ where: { email } });
    }
    async findById(id) {
        return this.repo.findOne({ where: { _id: id } });
    }
    async create(data) {
        const doc = this.repo.create(data);
        return this.repo.save(doc);
    }
};
exports.UserRepository = UserRepository;
exports.UserRepository = UserRepository = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [])
], UserRepository);
//# sourceMappingURL=UserRepository.js.map