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
exports.BookingRepository = void 0;
const tsyringe_1 = require("tsyringe");
const database_1 = require("../config/database");
const Booking_1 = require("../models/Booking");
let BookingRepository = class BookingRepository {
    constructor() {
        this.repo = database_1.AppDataSource.getMongoRepository(Booking_1.Booking);
    }
    async create(data) {
        const doc = this.repo.create(data);
        return this.repo.save(doc);
    }
    async update(id, data) {
        await this.repo.update(id, data);
        return this.findById(id);
    }
    async findById(id) {
        return this.repo.findOne({ where: { _id: id } });
    }
    async findByPaymentIntent(paymentIntentId) {
        return this.repo.findOne({ where: { paymentIntentId } });
    }
    async listByUser(userId) {
        return this.repo.find({
            where: {
                userId: userId
            }
        });
    }
};
exports.BookingRepository = BookingRepository;
exports.BookingRepository = BookingRepository = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [])
], BookingRepository);
//# sourceMappingURL=BookingRepository.js.map