import { z } from 'zod';
import { EmailDtoSchema } from './email.schema';
import { PhoneDtoSchema } from './phone.schema';

const MAX_FILE_SIZE = 50 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

const profileImageSchema = z.instanceof(File).refine((file) => file.size <= MAX_FILE_SIZE, {
  message: "La imagen no debe superar los 50 MB",
}).refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
  message: "Formato inválido. Usa JPG, PNG o WEBP",
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

