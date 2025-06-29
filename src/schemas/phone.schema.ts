import { z } from 'zod';

export const PhoneDtoSchema = z.object({
  id: z.number().optional().nullable(),
  number: z.string().min(1, 'El número no puede estar vacío'),
  contact_id: z.number().optional(),
});
