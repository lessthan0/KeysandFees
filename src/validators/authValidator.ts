import { z } from 'zod';

export const RegistrationSchema = z.object({
  email: z.email(),
  // Enforce minimum complexity before hashing
  password: z.string().min(8).max(64),
});

export const UpdateProfileSchema = z.object({
  email: z.email().optional(),
  password: z.string().min(8).optional(),
  displayName: z.string().min(1).max(50).nullable().optional(),
});

export type RegistrationBody = z.infer<typeof RegistrationSchema>;
export type ProfileBody = z.infer<typeof UpdateProfileSchema>;
