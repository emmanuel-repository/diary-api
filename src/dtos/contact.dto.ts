import { EmailDto } from "./email.dto";
import { PhoneDto } from "./phone.dto";

export interface ContactDto { 
  id: number;
  name: string;
  fathers_surname: string;
  mothers_surname: string;
  birthdate: string;
  alias: string;
  emails?: EmailDto[];
  phones?: PhoneDto[];
}