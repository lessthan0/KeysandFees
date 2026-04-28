import { z } from 'zod';
import { UserRole } from '../entities/User.js';
export const RegistrationSchema = z.object({
  email: z.email(),
  // Enforce minimum complexity before hashing
  password: z.string().min(8).max(64),

  role: z.enum(UserRole),
  displayName: z.string().min(1).max(50).nullable().optional(),
});

export const UpdateProfileSchema = z.object({
  email: z.email().optional(),
  password: z.string().min(8).optional(),

  role: z.enum(UserRole),
  displayName: z.string().min(1).max(50).nullable().optional,
});

export type RegistrationBody = z.infer<typeof RegistrationSchema>;
export type ProfileBody = z.infer<typeof UpdateProfileSchema>;
