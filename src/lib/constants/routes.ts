/**
 * An array of routes which are accessible to public
 * These routes do not require authentication
 * @type {string[]}
 */
export const PUBLIC_ROUTES: string[] = ["/"];

/**
 * An array of routes which are used for authentication
 * These routes redirect the logged in user to the /settings page
 * @type {string[]}
 */
export const AUTH_ROUTES: string[] = [
  "/auth/login",
  "/auth/register",
  // '/auth/error',
  // '/auth/reset',
  // '/auth/new-password',
];

/**
 * The default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/dashboard";

/**
 * Prefix for API authentication routes
 * @type {string}
 */
export const API_AUTH_PREFIX = "/api/auth";
