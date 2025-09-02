"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingMapper = void 0;
exports.BookingMapper = {
    toResponse(b) {
        return {
            id: b.id.toHexString(),
            userId: b.userId.toHexString(),
            eventId: b.eventId.toHexString(),
            ticketId: b.ticketId.toHexString(),
            quantity: b.quantity,
            amountCents: b.amountCents,
            status: b.status,
            createdAt: b.createdAt.toISOString(),
            updatedAt: b.updatedAt.toISOString(),
        };
    },
};
//# sourceMappingURL=BookingMapper.js.map