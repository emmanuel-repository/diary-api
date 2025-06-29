import { ContactDto } from "../dtos/contact.dto";
import { Contact } from "../models/init-models";
import { mapEmailToDto } from "./email.mapper";
import { mapPhoneToDto } from "./phone.mapper";


export const mapContactToDto = (contact: Contact): ContactDto => ({
  id: contact.id,
  name: contact.name,
  fathers_surname: contact.fathers_surname,
  mothers_surname: contact.mothers_surname,
  birthdate: contact.birthdate,
  alias: contact.alias,
  emails: contact.emails?.map(mapEmailToDto) ?? [],
  phones: contact.phones?.map(mapPhoneToDto) ?? []
});