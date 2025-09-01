"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const User_1 = require("../models/User");
const Ticket_1 = require("../models/Ticket");
const Event_1 = require("../models/Event");
const Booking_1 = require("../models/Booking");
const MONGO_URL = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/event_management";
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mongodb",
    url: MONGO_URL,
    entities: [User_1.User, Ticket_1.Ticket, Event_1.Event, Booking_1.Booking],
    logging: false,
});
//# sourceMappingURL=database.js.map