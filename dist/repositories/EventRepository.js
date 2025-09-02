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
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventRepository = void 0;
const tsyringe_1 = require("tsyringe");
const database_1 = require("../config/database");
const Event_1 = require("../models/Event");
let EventRepository = class EventRepository {
    constructor() {
        this.repo = database_1.AppDataSource.getMongoRepository(Event_1.Event);
    }
    async create(data) {
        const doc = this.repo.create(data);
        return this.repo.save(doc);
    }
    async update(id, data) {
        await this.repo.update(id, data);
        return this.findById(id);
    }
    async delete(id) {
        const res = await this.repo.delete(id);
        return !!res.affected;
    }
    async findById(id) {
        return this.repo.findOne({ where: { _id: id } });
    }
    async list() {
        return this.repo.find({ order: { date: 1 } });
    }
    async listByOrganizer(organizerId) {
        return this.repo.find({ where: { organizerId } });
    }
};
exports.EventRepository = EventRepository;
exports.EventRepository = EventRepository = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [])
], EventRepository);
//# sourceMappingURL=EventRepository.js.map