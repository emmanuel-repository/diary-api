import { EmailDto } from "../dtos/email.dto";
import { Email } from "../models/init-models";

export const mapEmailToDto = (email: Email): EmailDto => ({
  id: email.id,
  email: email.email,
  contact_id: email.contact_id
});