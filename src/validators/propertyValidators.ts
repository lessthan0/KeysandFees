import { z } from 'zod';
export const propertyStatusSchema = z.enum(['vacant', 'occupied']);

export const PropertySchema = z.object({
  address: z.string().min(5),
  status: propertyStatusSchema,
  bedrooms: z.coerce.number().min(1),
  yearbuilt: z.number().min(1930).max(2026),
});

export type propertyStatusSchema = z.infer<typeof PropertySchema>;
