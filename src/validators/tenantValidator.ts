import { z } from 'zod';

export const createTenantSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.email().optional(),
  phone: z.string().optional(),
  maritalStatus: z.string().optional(),
  notes: z.string().optional(),
});
