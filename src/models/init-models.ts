import type { Sequelize } from "sequelize";
import { Contact as _Contact } from "./contact";
import type { ContactAttributes, ContactCreationAttributes } from "./contact";
import { Email as _Email } from "./email";
import type { EmailAttributes, EmailCreationAttributes } from "./email";
import { Phone as _Phone } from "./phone";
import type { PhoneAttributes, PhoneCreationAttributes } from "./phone";

export {
  _Contact as Contact,
  _Email as Email,
  _Phone as Phone,
};

export type {
  ContactAttributes,
  ContactCreationAttributes,
  EmailAttributes,
  EmailCreationAttributes,
  PhoneAttributes,
  PhoneCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const Contact = _Contact.initModel(sequelize);
  const Email = _Email.initModel(sequelize);
  const Phone = _Phone.initModel(sequelize);

  Email.belongsTo(Contact, { as: "contact", foreignKey: "contact_id"});
  Contact.hasMany(Email, { as: "emails", foreignKey: "contact_id"});
  Phone.belongsTo(Contact, { as: "contact", foreignKey: "contact_id"});
  Contact.hasMany(Phone, { as: "phones", foreignKey: "contact_id"});

  return {
    Contact: Contact,
    Email: Email,
    Phone: Phone,
  };
}
