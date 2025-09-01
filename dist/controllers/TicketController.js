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
exports.TicketController = void 0;
const tsyringe_1 = require("tsyringe");
const TicketMapper_1 = require("../mappers/TicketMapper");
const mongodb_1 = require("mongodb");
let TicketController = class TicketController {
    constructor(tickets) {
        this.tickets = tickets;
        this.create = async (req, res, next) => {
            try {
                const eventId = new mongodb_1.ObjectId(req.params.eventId);
                const { name, priceCents, totalQuantity } = req.body;
                const ticket = await this.tickets.create(eventId, { name, priceCents, totalQuantity });
                res.status(201).json(TicketMapper_1.TicketMapper.toResponse(ticket));
            }
            catch (err) {
                next(err);
            }
        };
        this.listByEvent = async (req, res, next) => {
            try {
                const eventId = new mongodb_1.ObjectId(req.params.eventId);
                const tickets = await this.tickets.listByEvent(eventId);
                res.json(tickets.map(TicketMapper_1.TicketMapper.toResponse));
            }
            catch (err) {
                next(err);
            }
        };
        this.get = async (req, res, next) => {
            try {
                const id = new mongodb_1.ObjectId(req.params.id);
                const ticket = await this.tickets.get(id);
                res.json(TicketMapper_1.TicketMapper.toResponse(ticket));
            }
            catch (err) {
                next(err);
            }
        };
    }
};
exports.TicketController = TicketController;
exports.TicketController = TicketController = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('TicketService')),
    __metadata("design:paramtypes", [Object])
], TicketController);
//# sourceMappingURL=TicketController.js.map