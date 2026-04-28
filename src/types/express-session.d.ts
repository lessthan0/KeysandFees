import 'express-session';
import { UserRole } from '../entities/User.js';
declare module 'express-session' {
  export interface Session {
    clearSession(): Promise<void>; // DO NOT MODIFY THIS!

    // NOTES: Add your app's custom session properties here:
    authenticatedUser?: {
      userId: string;
      email: string;
      displayName: string;
      role: UserRole;
    };
    isLoggedIn?: boolean;
    logInAttempts?: number;
  }
}
