"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketMapper = void 0;
exports.TicketMapper = {
    toResponse(t) {
        return {
            id: t.id.toHexString(),
            eventId: t.eventId.toHexString(),
            name: t.name,
            priceCents: t.priceCents,
            totalQuantity: t.totalQuantity,
            remainingQuantity: t.remainingQuantity,
            createdAt: t.createdAt.toISOString(),
            updatedAt: t.updatedAt.toISOString(),
        };
    },
};
//# sourceMappingURL=TicketMapper.js.map