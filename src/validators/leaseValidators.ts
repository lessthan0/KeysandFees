import { z } from 'zod';

export const createLeaseSchema = z
  .object({
    tenantId: z.number().int().positive(),
    startDate: z.coerce.date(),
    endDate: z.coerce.date(),
    rentAmount: z.number().positive(),
  })
  .refine((data) => data.endDate > data.startDate, {
    message: 'Lease end date occurs after start.',
    path: ['endDate'],
  });
