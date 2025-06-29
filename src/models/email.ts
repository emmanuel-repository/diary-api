import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Contact, ContactId } from './contact';

export interface EmailAttributes {
  id: number;
  email: string;
  contact_id?: number;
}

export type EmailPk = "id";
export type EmailId = Email[EmailPk];
export type EmailOptionalAttributes = "id" | "contact_id";
export type EmailCreationAttributes = Optional<EmailAttributes, EmailOptionalAttributes>;

export class Email extends Model<EmailAttributes, EmailCreationAttributes> implements EmailAttributes {
  id!: number;
  email!: string;
  contact_id?: number;

  // Email belongsTo Contact via contact_id
  contact!: Contact;
  getContact!: Sequelize.BelongsToGetAssociationMixin<Contact>;
  setContact!: Sequelize.BelongsToSetAssociationMixin<Contact, ContactId>;
  createContact!: Sequelize.BelongsToCreateAssociationMixin<Contact>;

  static initModel(sequelize: Sequelize.Sequelize): typeof Email {
    return sequelize.define('Email', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING(400),
      allowNull: false
    },
    contact_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'contacts',
        key: 'id'
      }
    }
  }, {
    tableName: 'emails',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "emails_contacts_id_fk",
        using: "BTREE",
        fields: [
          { name: "contact_id" },
        ]
      },
    ]
  }) as typeof Email;
  }
}
