import type { Ticket } from "../models/Ticket"
export const TicketMapper = {
  toResponse(t: Ticket) {
    return {
      id: t.id.toHexString(),
      eventId: t.eventId.toHexString(),
      name: t.name,
      priceCents: t.priceCents,
      totalQuantity: t.totalQuantity,
      remainingQuantity: t.remainingQuantity,
      createdAt: t.createdAt.toISOString(),
      updatedAt: t.updatedAt.toISOString(),
    }
  },
}
