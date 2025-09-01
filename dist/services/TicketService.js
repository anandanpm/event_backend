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
exports.TicketService = void 0;
const tsyringe_1 = require("tsyringe");
let TicketService = class TicketService {
    constructor(tickets, events) {
        this.tickets = tickets;
        this.events = events;
    }
    async create(eventId, data) {
        const event = await this.events.findById(eventId);
        if (!event)
            throw new Error("Event not found");
        const now = new Date();
        const ticket = {
            ...data,
            eventId,
            remainingQuantity: data.totalQuantity || 0,
            createdAt: now,
            updatedAt: now,
        };
        return this.tickets.create(ticket);
    }
    async listByEvent(eventId) {
        return this.tickets.listByEvent(eventId);
    }
    async get(id) {
        const t = await this.tickets.findById(id);
        if (!t)
            throw new Error("Ticket not found");
        return t;
    }
};
exports.TicketService = TicketService;
exports.TicketService = TicketService = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("TicketRepository")),
    __param(1, (0, tsyringe_1.inject)("EventRepository")),
    __metadata("design:paramtypes", [Object, Object])
], TicketService);
//# sourceMappingURL=TicketService.js.map