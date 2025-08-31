import { injectable } from "tsyringe"
import type { BookingRepository } from "../repositories/BookingRepository"
import type { TicketRepository } from "../repositories/TicketRepository"
import type { EventRepository } from "../repositories/EventRepository"
import type { ObjectId } from "mongodb"
import { stripe } from "../config/stripe"
import type { Booking } from "../models/Booking"

@injectable()
export class BookingService {
  constructor(
    private bookings: BookingRepository,
    private tickets: TicketRepository,
    private events: EventRepository,
  ) {}

  async createBooking(userId: ObjectId, ticketId: ObjectId, quantity: number) {
    const ticket = await this.tickets.findById(ticketId)
    if (!ticket) throw new Error("Ticket not found")
    if (quantity < 1) throw new Error("Quantity must be at least 1")
    if (ticket.remainingQuantity < quantity) throw new Error("Not enough tickets")

    const amountCents = ticket.priceCents * quantity

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountCents,
      currency: "usd",
      metadata: { ticketId: ticketId.toHexString(), userId: userId.toHexString() },
      automatic_payment_methods: { enabled: true },
    })

    const now = new Date()
    const booking: Partial<Booking> = {
      userId,
      eventId: ticket.eventId,
      ticketId,
      quantity,
      amountCents,
      paymentIntentId: paymentIntent.id,
      status: "pending",
      createdAt: now,
      updatedAt: now,
    }
    const created = await this.bookings.create(booking)
    return { booking: created, clientSecret: paymentIntent.client_secret || null }
  }

  async handlePaymentSucceeded(paymentIntentId: string) {
    const booking = await this.bookings.findByPaymentIntent(paymentIntentId)
    if (!booking) return
    if (booking.status === "paid") return

    // decrement inventory
    const ticket = await this.tickets.findById(booking.ticketId)
    if (ticket) {
      const remaining = Math.max(0, ticket.remainingQuantity - booking.quantity)
      await this.tickets.update(ticket.id, { remainingQuantity: remaining, updatedAt: new Date() })
    }

    await this.bookings.update(booking.id, { status: "paid", updatedAt: new Date() })
  }

  async listForUser(userId: ObjectId) {
    return this.bookings.listByUser(userId)
  }
}
