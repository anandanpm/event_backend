"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AUTH_COOKIE_NAME = void 0;
exports.setAuthCookie = setAuthCookie;
exports.clearAuthCookie = clearAuthCookie;
exports.AUTH_COOKIE_NAME = "token";
const getCookieConfig = () => {
    const isSecure = process.env.COOKIE_SECURE === 'true';
    const sameSiteValue = process.env.COOKIE_SAME_SITE || 'none';
    return {
        httpOnly: true,
        secure: isSecure,
        sameSite: isSecure ? sameSiteValue : 'lax',
        domain: process.env.COOKIE_DOMAIN || undefined,
        path: '/',
    };
};
function setAuthCookie(res, token) {
    const options = {
        ...getCookieConfig(),
        maxAge: 7 * 24 * 60 * 60 * 1000,
    };
    console.log("Setting cookie with options:", options);
    res.cookie(exports.AUTH_COOKIE_NAME, token, options);
}
function clearAuthCookie(res) {
    const options = {
        ...getCookieConfig(),
    };
    res.clearCookie(exports.AUTH_COOKIE_NAME, options);
}
//# sourceMappingURL=cookies.js.map