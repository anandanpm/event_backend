"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMapper = void 0;
exports.UserMapper = {
    toSafe(user) {
        return {
            id: user.id.toHexString(),
            name: user.name,
            email: user.email,
            role: user.role,
            createdAt: user.createdAt.toISOString(),
            updatedAt: user.updatedAt.toISOString(),
        };
    },
};
//# sourceMappingURL=UserMapper.js.map