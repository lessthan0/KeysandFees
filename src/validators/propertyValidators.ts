import { z } from 'zod';
import { PropertyStatus } from '../entities/Properties.js';

export const propertyStatusSchema = z.enum(PropertyStatus);

export const CreatePropertySchema = z.object({
  address: z.string().min(5),
  status: propertyStatusSchema.default(PropertyStatus.VACANT),
  rentAmount: z.number().int().positive(),
  bedrooms: z.coerce.number().min(1),
  bathrooms: z.coerce.number().int().min(0).default(1),
  petFriendly: z.coerce.boolean().default(false),
  fencedBackyard: z.coerce.boolean().default(false),
  yearbuilt: z.coerce.number().min(1930).max(2026),
  imageUrl: z.url().optional(),
});

export const UpdatePropertySchema = CreatePropertySchema.partial();

export type CreatePropertyData = z.infer<typeof CreatePropertySchema>;
export type UpdatePropertyData = z.infer<typeof UpdatePropertySchema>;
