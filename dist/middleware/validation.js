"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateBody = validateBody;
const class_validator_1 = require("class-validator");
function validateBody(DtoClass) {
    return async (req, res, next) => {
        const dto = new DtoClass();
        Object.assign(dto, req.body);
        const errors = await (0, class_validator_1.validate)(dto, { whitelist: true });
        if (errors.length > 0) {
            return res.status(400).json({ message: "Validation failed", errors });
        }
        next();
    };
}
//# sourceMappingURL=validation.js.map