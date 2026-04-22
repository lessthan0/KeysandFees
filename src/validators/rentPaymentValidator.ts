import { z } from 'zod';

export const CreateRentPaymentSchema = z.object({
  rentMonth: z.string().regex(/^\d{4}-\d{2}$/), // example: "2026-06"
  rentAmountPaid: z.number().positive(),
  paidAt: z.coerce.date().optional(),
  late: z.boolean().default(false),
  notes: z.string().optional(),
});
