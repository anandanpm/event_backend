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
exports.CreateEventDto = void 0;
const class_validator_1 = require("class-validator");
class CreateEventDto {
}
exports.CreateEventDto = CreateEventDto;
__decorate([
    (0, class_validator_1.IsString)({ message: "Title must be a string" }),
    (0, class_validator_1.IsNotEmpty)({ message: "Title is required" }),
    __metadata("design:type", String)
], CreateEventDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: "Description must be a string" }),
    (0, class_validator_1.IsNotEmpty)({ message: "Description is required" }),
    __metadata("design:type", String)
], CreateEventDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: "Location must be a string" }),
    (0, class_validator_1.IsNotEmpty)({ message: "Location is required" }),
    __metadata("design:type", String)
], CreateEventDto.prototype, "location", void 0);
__decorate([
    (0, class_validator_1.IsDateString)({}, { message: "Date must be a valid ISO date string (e.g. 2025-09-01T10:00:00Z)" }),
    __metadata("design:type", String)
], CreateEventDto.prototype, "date", void 0);
//# sourceMappingURL=CreateEventDto.js.map