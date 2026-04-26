import { z } from 'zod';

const LeaseFieldsSchema = z.object({
  tenantId: z.string().min(1),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  rentAmount: z.number().int().positive(),
});

export const CreateLeaseSchema = LeaseFieldsSchema.refine((data) => data.endDate > data.startDate, {
  path: ['endDate'],
  message: 'Lease end date must be after lease start date',
});

export const UpdateLeaseSchema = LeaseFieldsSchema.partial().refine(
  (data) => {
    if (data.startDate && data.endDate) {
      return data.endDate > data.startDate;
    }
    return true;
  },
  {
    path: ['endDate'],
    message: 'Lease end date must be after lease start date',
  },
);

export type CreateLeaseData = z.infer<typeof CreateLeaseSchema>;
export type UpdateLeaseData = z.infer<typeof UpdateLeaseSchema>;
