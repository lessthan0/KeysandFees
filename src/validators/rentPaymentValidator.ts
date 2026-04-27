import { z } from 'zod';

export const CreateRentPaymentSchema = z.object({
  rentMonth: z.string().regex(/^\d{4}-\d{2}$/),
  rentAmount: z.coerce.number().int().positive(),
  paidAt: z.coerce.date().optional(),
  late: z.boolean().optional(),
  notes: z.string().optional(),
});

export const UpdateRentPaymentSchema = z.object({
  rentAmount: z.coerce.number().int().positive().optional(),
  paidAt: z.coerce.date().optional(),
  late: z.boolean().optional(),
  notes: z.string().optional(),
});

export type CreateRentPaymentSchema = z.infer<typeof CreateRentPaymentSchema>;
export type UpdateRentPaymentSchema = z.infer<typeof UpdateRentPaymentSchema>;
