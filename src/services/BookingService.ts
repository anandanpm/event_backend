import { inject, injectable } from "tsyringe"
import type { ObjectId } from "mongodb"
import { stripe } from "../config/stripe"
import type { Booking } from "../models/Booking"
import { IBookingRepository } from "../interfaces/repositories/IBookingRepository"
import { ITicketRepository } from "../interfaces/repositories/ITicketRepository"
import { IEmailService } from "../interfaces/services/IEmailService"
import { IUserRepository } from "../interfaces/repositories/IUserRepository"

@injectable()
export class BookingService {
 constructor(
    @inject("BookingRepository") private bookings: IBookingRepository,
    @inject("TicketRepository") private tickets: ITicketRepository,
    @inject("EmailService") private mailer: IEmailService,
    @inject("UserRepository") private users: IUserRepository
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
    const user = await this.users.findById(booking.userId)
    if (user) {
      await this.mailer.send(
        user.email,
        "Booking Confirmed 🎉",
        `<h1>Hi ${user.name},</h1>
         <p>Your booking for ticket ID ${booking.ticketId.toHexString()} has been confirmed.</p>
         <p>Quantity: ${booking.quantity}</p>
         <p>Total Amount: $${(booking.amountCents / 100).toFixed(2)}</p>
         <p>Thank you for booking with us!</p>`
      )
    }
  }

  async findByPaymentIntent(paymentIntentId: string) {
    try {
      console.log(`[BookingService] Looking up booking by PaymentIntent: ${paymentIntentId}`)
      const booking = await this.bookings.findByPaymentIntent(paymentIntentId)
      
      if (!booking) {
        console.log(`[BookingService] No booking found for PaymentIntent: ${paymentIntentId}`)
        return null
      }

      console.log(`[BookingService] Found booking ${booking.id} with status: ${booking.status}`)
      return booking
    } catch (error) {
      console.error(`[BookingService] Error finding booking by PaymentIntent ${paymentIntentId}:`, error)
      throw error
    }
  }

  async listForUser(userId: ObjectId) {
    return this.bookings.listByUser(userId)
  }
}
