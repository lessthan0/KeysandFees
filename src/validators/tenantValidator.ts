import { z } from 'zod';

export const CreateTenantSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.email().optional(),
  phone: z.string().optional(),
  maritalStatus: z.string().optional(),
  notes: z.string().optional(),
});
export const UpdateTenantSchema = CreateTenantSchema.partial();

export type CreateTenantData = z.infer<typeof CreateTenantSchema>;
export type UpdateTenantData = z.infer<typeof UpdateTenantSchema>;
