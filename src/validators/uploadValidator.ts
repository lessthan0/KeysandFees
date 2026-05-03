import { z } from 'zod';

const LeaseDocBodySchema = z.object({
  originalname: z.string().min(1),
  filename: z.string().min(1),
  mimetype: z.literal('application/pdf'),
  size: z
    .number()
    .positive()
    .max(10 * 1024 * 1024),
});

const LeaseIdParamsSchema = z.object({
  leaseId: z.string().uuidv7,
});

const PhotoDocBodySchema = z.object({
  caption: z.string().max(200).optional(),
  originalname: z.string().min(1),
  filename: z.string().min(1),
  mimetype: z.literal('application/pdf'),
  size: z
    .number()
    .positive()
    .max(10 * 1024 * 1024),
});

export { LeaseDocBodySchema, LeaseIdParamsSchema, PhotoDocBodySchema };
