import type { DependencyContainer } from "tsyringe"
import { UserRepository } from "../repositories/UserRepository"
import { EventRepository } from "../repositories/EventRepository"
import { TicketRepository } from "../repositories/TicketRepository"
import { BookingRepository } from "../repositories/BookingRepository"
import { AuthService } from "../services/AuthService"
import { EventService } from "../services/EventService"
import { TicketService } from "../services/TicketService"
import { BookingService } from "../services/BookingService"
import { EmailService } from "../services/EmailService"


export function initContainer(container: DependencyContainer) {
  container.registerSingleton(UserRepository, UserRepository)
  container.registerSingleton(EventRepository, EventRepository)
  container.registerSingleton(TicketRepository, TicketRepository)
  container.registerSingleton(BookingRepository, BookingRepository)

  container.registerSingleton(AuthService, AuthService)
  container.registerSingleton(EventService, EventService)
  container.registerSingleton(TicketService, TicketService)
  container.registerSingleton(BookingService, BookingService)
  container.registerSingleton(EmailService, EmailService)
}
