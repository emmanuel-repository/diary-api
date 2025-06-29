import { PhoneDto } from "../dtos/phone.dto";
import { Phone } from "../models/init-models";

export const mapPhoneToDto = (phone: Phone): PhoneDto => ({
  id: phone.id,
  number: phone.number,
  contact_id: phone.contact_id
});