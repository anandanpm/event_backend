import type { Response, CookieOptions } from "express";

export const AUTH_COOKIE_NAME = "token";

const getCookieConfig = (): Omit<CookieOptions, 'maxAge'> => {
  // A cookie with SameSite=None must be Secure. If not, the browser will reject it.
  const isSecure = process.env.COOKIE_SECURE === 'true';
  const sameSiteValue = (process.env.COOKIE_SAME_SITE as 'strict' | 'lax' | 'none') || 'none';

  return {
    httpOnly: true,
    secure: isSecure,
    // If the cookie is not secure (e.g., in a local HTTP dev environment),
    // it must fall back to 'lax' or it will be rejected.
    sameSite: isSecure ? sameSiteValue : 'lax',
    domain: process.env.COOKIE_DOMAIN || undefined,
    path: '/',
  };
};

export function setAuthCookie(res: Response, token: string) {
  const options: CookieOptions = {
    ...getCookieConfig(),
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  };

  console.log("Setting cookie with options:", options);
  res.cookie(AUTH_COOKIE_NAME, token, options);
}

export function clearAuthCookie(res: Response) {
  const options: CookieOptions = {
    ...getCookieConfig(),
  };

  res.clearCookie(AUTH_COOKIE_NAME, options);
}
