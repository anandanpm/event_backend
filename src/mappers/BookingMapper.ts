import type { Booking } from "../models/Booking"
export const BookingMapper = {
  toResponse(b: Booking) {
    return {
      id: b.id.toHexString(),
      userId: b.userId.toHexString(),
      eventId: b.eventId.toHexString(),
      ticketId: b.ticketId.toHexString(),
      quantity: b.quantity,
      amountCents: b.amountCents,
      status: b.status,
      paymentIntentId: b.paymentIntentId,
      createdAt: b.createdAt.toISOString(),
      updatedAt: b.updatedAt.toISOString(),
    }
  },
}
