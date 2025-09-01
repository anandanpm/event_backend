"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initContainer = initContainer;
// repositories
const UserRepository_1 = require("../repositories/UserRepository");
const EventRepository_1 = require("../repositories/EventRepository");
const TicketRepository_1 = require("../repositories/TicketRepository");
const BookingRepository_1 = require("../repositories/BookingRepository");
// services
const AuthService_1 = require("../services/AuthService");
const EventService_1 = require("../services/EventService");
const TicketService_1 = require("../services/TicketService");
const BookingService_1 = require("../services/BookingService");
const EmailService_1 = require("../services/EmailService");
function initContainer(container) {
    // Repositories
    container.registerSingleton("UserRepository", UserRepository_1.UserRepository);
    container.registerSingleton("EventRepository", EventRepository_1.EventRepository);
    container.registerSingleton("TicketRepository", TicketRepository_1.TicketRepository);
    container.registerSingleton("BookingRepository", BookingRepository_1.BookingRepository);
    // Services
    container.registerSingleton("AuthService", AuthService_1.AuthService);
    container.registerSingleton("EventService", EventService_1.EventService);
    container.registerSingleton("TicketService", TicketService_1.TicketService);
    container.registerSingleton("BookingService", BookingService_1.BookingService);
    container.registerSingleton("EmailService", EmailService_1.EmailService);
}
//# sourceMappingURL=container.js.map