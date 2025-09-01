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
exports.BookingService = void 0;
const tsyringe_1 = require("tsyringe");
const stripe_1 = require("../config/stripe");
let BookingService = class BookingService {
    constructor(bookings, tickets, mailer, users) {
        this.bookings = bookings;
        this.tickets = tickets;
        this.mailer = mailer;
        this.users = users;
    }
    async createBooking(userId, ticketId, quantity) {
        const ticket = await this.tickets.findById(ticketId);
        if (!ticket)
            throw new Error("Ticket not found");
        if (quantity < 1)
            throw new Error("Quantity must be at least 1");
        if (ticket.remainingQuantity < quantity)
            throw new Error("Not enough tickets");
        const amountCents = ticket.priceCents * quantity;
        const paymentIntent = await stripe_1.stripe.paymentIntents.create({
            amount: amountCents,
            currency: "usd",
            metadata: { ticketId: ticketId.toHexString(), userId: userId.toHexString() },
            automatic_payment_methods: { enabled: true },
        });
        const now = new Date();
        const booking = {
            userId,
            eventId: ticket.eventId,
            ticketId,
            quantity,
            amountCents,
            paymentIntentId: paymentIntent.id,
            status: "pending",
            createdAt: now,
            updatedAt: now,
        };
        const created = await this.bookings.create(booking);
        return { booking: created, clientSecret: paymentIntent.client_secret || null };
    }
    async handlePaymentSucceeded(paymentIntentId) {
        const booking = await this.bookings.findByPaymentIntent(paymentIntentId);
        if (!booking)
            return;
        if (booking.status === "paid")
            return;
        // decrement inventory
        const ticket = await this.tickets.findById(booking.ticketId);
        if (ticket) {
            const remaining = Math.max(0, ticket.remainingQuantity - booking.quantity);
            await this.tickets.update(ticket.id, { remainingQuantity: remaining, updatedAt: new Date() });
        }
        await this.bookings.update(booking.id, { status: "paid", updatedAt: new Date() });
        const user = await this.users.findById(booking.userId);
        if (user) {
            await this.mailer.send(user.email, "Booking Confirmed 🎉", `<h1>Hi ${user.name},</h1>
         <p>Your booking for ticket ID ${booking.ticketId.toHexString()} has been confirmed.</p>
         <p>Quantity: ${booking.quantity}</p>
         <p>Total Amount: $${(booking.amountCents / 100).toFixed(2)}</p>
         <p>Thank you for booking with us!</p>`);
        }
    }
    async listForUser(userId) {
        return this.bookings.listByUser(userId);
    }
};
exports.BookingService = BookingService;
exports.BookingService = BookingService = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("BookingRepository")),
    __param(1, (0, tsyringe_1.inject)("TicketRepository")),
    __param(2, (0, tsyringe_1.inject)("EmailService")),
    __param(3, (0, tsyringe_1.inject)("UserRepository")),
    __metadata("design:paramtypes", [Object, Object, Object, Object])
], BookingService);
//# sourceMappingURL=BookingService.js.map