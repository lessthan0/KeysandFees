import './config.js';
import connectPgSimple from 'connect-pg-simple';
import { NextFunction, Request, Response } from 'express';
import session from 'express-session';

const isProduction = process.env.NODE_ENV === 'production';
const cookieSecret = process.env.COOKIE_SECRET;

if (!cookieSecret) {
  throw new Error('COOKIE_SECRET is missing. Add it to your .env file.');
}

const PostgresStore = connectPgSimple(session);

// Store sessions in PostgreSQL
const sessionStorage = new PostgresStore({
  createTableIfMissing: true,
  conString: `postgres://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
});

const sessionMiddleware = session({
  store: sessionStorage,
  secret: cookieSecret, // Signs cookie to prevent forgery
  cookie: {
    maxAge: 8 * 60 * 60 * 1000, // 8-hour session expiry
    httpOnly: true, // No client-side JS access (XSS protection)
    secure: isProduction, // HTTPS only in production
    sameSite: 'lax', // Basic CSRF protection
  },
  name: 'session', // Cookie name in the browser
  resave: false, // Skip re-saving unmodified sessions
  saveUninitialized: false, // Don't save empty sessions (no cookie until session is used)
});

function requireAuth(req: Request, res: Response, next: NextFunction): void {
  if (!req.session.authenticatedUser?.userId) {
    res.sendStatus(401);
    return;
  }

  next();
}

function requireAdmin(req: Request, res: Response, next: NextFunction): void {
  const user = req.session.authenticatedUser;
  if (!user) {
    res.sendStatus(401);
    return;
  }

  if (user.role != 'admin') {
    res.sendStatus(403);
    return;
  }
  next();
}

function isAdmin(req: Request): boolean {
  return req.session.authenticatedUser?.role === 'admin';
}

export { isAdmin, requireAdmin, requireAuth, sessionMiddleware };
