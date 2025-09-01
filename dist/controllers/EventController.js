"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventController = void 0;
const tsyringe_1 = require("tsyringe");
const EventMapper_1 = require("../mappers/EventMapper");
const mongodb_1 = require("mongodb");
function toObjectId(id) {
    if (!mongodb_1.ObjectId.isValid(id)) {
        throw new Error("Invalid ObjectId format");
    }
    return new mongodb_1.ObjectId(id);
}
let EventController = class EventController {
    constructor(events) {
        this.events = events;
        this.create = async (req, res, next) => {
            try {
                const organizerId = toObjectId(req.user.id);
                const data = req.body;
                console.log(organizerId, 'organizerId from the body');
                console.log(data, 'data from the body');
                const event = await this.events.create(organizerId, {
                    title: data.title,
                    description: data.description,
                    location: data.location,
                    date: new Date(data.date),
                });
                console.log(event, 'event is saved in the database');
                res.status(201).json(EventMapper_1.EventMapper.toResponse(event));
            }
            catch (err) {
                next(err);
            }
        };
        this.update = async (req, res, next) => {
            try {
                const organizerId = toObjectId(req.user.id);
                const id = toObjectId(req.params.id);
                const patch = { ...req.body };
                if (patch.date)
                    patch.date = new Date(patch.date);
                const event = await this.events.update(organizerId, id, patch);
                res.json(EventMapper_1.EventMapper.toResponse(event));
            }
            catch (err) {
                next(err);
            }
        };
        this.delete = async (req, res, next) => {
            try {
                const organizerId = toObjectId(req.user.id);
                const id = toObjectId(req.params.id);
                await this.events.delete(organizerId, id);
                res.status(204).send();
            }
            catch (err) {
                next(err);
            }
        };
        this.get = async (req, res, next) => {
            try {
                const id = toObjectId(req.params.id);
                const event = await this.events.get(id);
                res.json(EventMapper_1.EventMapper.toResponse(event));
            }
            catch (err) {
                next(err);
            }
        };
        this.list = async (_req, res, next) => {
            try {
                const events = await this.events.list();
                res.json(events.map(EventMapper_1.EventMapper.toResponse));
            }
            catch (err) {
                next(err);
            }
        };
    }
};
exports.EventController = EventController;
exports.EventController = EventController = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("EventService")),
    __metadata("design:paramtypes", [Object])
], EventController);
//# sourceMappingURL=EventController.js.map