import type { DependencyContainer } from "tsyringe"

// repositories
import { UserRepository } from "../repositories/UserRepository"
import { EventRepository } from "../repositories/EventRepository"
import { TicketRepository } from "../repositories/TicketRepository"
import { BookingRepository } from "../repositories/BookingRepository"

// services
import { AuthService } from "../services/AuthService"
import { EventService } from "../services/EventService"
import { TicketService } from "../services/TicketService"
import { BookingService } from "../services/BookingService"
import { EmailService } from "../services/EmailService"

// interfaces
import { IUserRepository } from "../interfaces/repositories/IUserRepository"
import { IAuthService } from "../interfaces/services/IAuthService"
import { IEventRepository } from "../interfaces/repositories/IEventRepository"
import { ITicketRepository } from "../interfaces/repositories/ITicketRepository"
import { IBookingRepository } from "../interfaces/repositories/IBookingRepository"
import { IEventService } from "../interfaces/services/IEventService"
import { ITicketService } from "../interfaces/services/ITicketService"
import { IBookingService } from "../interfaces/services/IBookingService"
import { IEmailService } from "../interfaces/services/IEmailService"

export function initContainer(container: DependencyContainer) {
  // Repositories
  container.registerSingleton<IUserRepository>("UserRepository", UserRepository)
  container.registerSingleton<IEventRepository>("EventRepository", EventRepository)
  container.registerSingleton<ITicketRepository>("TicketRepository", TicketRepository)
  container.registerSingleton<IBookingRepository>("BookingRepository", BookingRepository)

  // Services
  container.registerSingleton<IAuthService>("AuthService", AuthService)
  container.registerSingleton<IEventService>("EventService", EventService)
  container.registerSingleton<ITicketService>("TicketService", TicketService)
  container.registerSingleton<IBookingService>("BookingService", BookingService)
  container.registerSingleton<IEmailService>("EmailService", EmailService)
}
