"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventMapper = void 0;
exports.EventMapper = {
    toResponse(e) {
        return {
            id: e.id.toHexString(),
            title: e.title,
            description: e.description,
            location: e.location,
            date: e.date.toISOString(),
            organizerId: e.organizerId.toHexString(),
            createdAt: e.createdAt.toISOString(),
            updatedAt: e.updatedAt.toISOString(),
        };
    },
};
//# sourceMappingURL=EventMapper.js.map