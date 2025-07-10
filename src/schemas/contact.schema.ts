import { z } from 'zod';
import { EmailDtoSchema } from './email.schema';
import { PhoneDtoSchema } from './phone.schema';

const MAX_FILE_SIZE = 50 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

export const profileImageSchema = z.object({
  originalname: z.string(),
  mimetype: z.string().refine((type) => ['image/png', 'image/jpeg'].includes(type), {
    message: 'Solo se permiten PNG o JPEG',
  }),
  size: z.number().max(MAX_FILE_SIZE, 'La imagen es demasiado grande'),
});

export const ContactDtoSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1),
  fathers_surname: z.string().min(1),
  mothers_surname: z.string().min(1),
  birthdate: z.string(),
  alias: z.string().min(1),
  profile_image: profileImageSchema.optional().nullable(),
  emails: z.string(EmailDtoSchema).optional().default('[]'),
  phones: z.string(PhoneDtoSchema).optional().default('[]'),
});

