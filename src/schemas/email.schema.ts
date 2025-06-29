import { z } from 'zod';

export const EmailDtoSchema = z.object({
  id: z.number().optional().nullable(),
  email: z.string().email(),
  contact_id: z.number().optional(),
});