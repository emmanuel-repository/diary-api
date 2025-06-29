import { z } from 'zod';
import { EmailDtoSchema } from './email.schema';
import { PhoneDtoSchema } from './phone.schema';

export const ContactDtoSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1),
  fathers_surname: z.string().min(1),
  mothers_surname: z.string().min(1),
  birthdate: z.string(),
  alias: z.string().min(1),
  emails: z.array(EmailDtoSchema).optional().default([]),
  phones: z.array(PhoneDtoSchema).optional().default([]),
});