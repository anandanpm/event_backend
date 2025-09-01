import type { Response, CookieOptions } from "express";

export const AUTH_COOKIE_NAME = "token";

const getCookieConfig = (): Omit<CookieOptions, 'maxAge'> => {

  const isSecure = process.env.COOKIE_SECURE === 'true';
  const sameSiteValue = (process.env.COOKIE_SAME_SITE as 'strict' | 'lax' | 'none') || 'none';

  return {
    httpOnly: true,
    secure: isSecure,
    sameSite: isSecure ? sameSiteValue : 'lax',
    domain: process.env.COOKIE_DOMAIN || undefined,
    path: '/',
  };
};

export function setAuthCookie(res: Response, token: string) {
  const options: CookieOptions = {
    ...getCookieConfig(),
    maxAge: 7 * 24 * 60 * 60 * 1000, 
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
