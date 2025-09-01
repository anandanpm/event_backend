"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
function errorHandler(err, _req, res, _next) {
    const status = err.status || 400;
    const message = err.message || "Unexpected error";
    if (process.env.NODE_ENV !== "test") {
        console.error("[error]", err);
    }
    res.status(status).json({ message });
}
//# sourceMappingURL=errorHandler.js.map