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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingController = void 0;
const tsyringe_1 = require("tsyringe");
const mongodb_1 = require("mongodb");
const BookingMapper_1 = require("../mappers/BookingMapper");
let BookingController = class BookingController {
    constructor(bookings) {
        this.bookings = bookings;
        this.create = async (req, res, next) => {
            try {
                const userId = new mongodb_1.ObjectId(req.body.userId);
                const ticketId = new mongodb_1.ObjectId(req.body.ticketId);
                const quantity = Number(req.body.quantity);
                const { booking, clientSecret } = await this.bookings.createBooking(userId, ticketId, quantity);
                res.status(201).json({ ...BookingMapper_1.BookingMapper.toResponse(booking), clientSecret });
            }
            catch (err) {
                next(err);
            }
        };
        this.listMine = async (req, res, next) => {
            try {
                const userIdString = req.query.userId;
                const userId = new mongodb_1.ObjectId(userIdString);
                const bookings = await this.bookings.listForUser(userId);
                res.json(bookings.map(BookingMapper_1.BookingMapper.toResponse));
            }
            catch (err) {
                next(err);
            }
        };
    }
};
exports.BookingController = BookingController;
exports.BookingController = BookingController = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('BookingService')),
    __metadata("design:paramtypes", [Function])
], BookingController);
//# sourceMappingURL=BookingController.js.map