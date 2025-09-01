"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = auth;
const jwt_1 = require("../utils/jwt");
function auth(allowedRoles) {
    return (req, res, next) => {
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader) {
                return res.status(401).json({ message: "No token provided" });
            }
            const token = authHeader.split(" ")[1];
            const payload = (0, jwt_1.verifyJwt)(token);
            if (!payload) {
                return res.status(401).json({ message: "Invalid token" });
            }
            // Map JWT "sub" → "id"
            const userPayload = {
                id: payload.sub, // 👈 fix here
                role: payload.role,
            };
            if (!allowedRoles.includes(userPayload.role)) {
                return res.status(403).json({ message: "Forbidden" });
            }
            req.user = userPayload;
            next();
        }
        catch (err) {
            return res.status(401).json({ message: "Unauthorized" });
        }
    };
}
//# sourceMappingURL=auth.js.map