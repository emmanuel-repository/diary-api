import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Contact, ContactId } from './contact';

export interface PhoneAttributes {
  id: number;
  number: string;
  contact_id?: number;
}

export type PhonePk = "id";
export type PhoneId = Phone[PhonePk];
export type PhoneOptionalAttributes = "id" | "contact_id";
export type PhoneCreationAttributes = Optional<PhoneAttributes, PhoneOptionalAttributes>;

export class Phone extends Model<PhoneAttributes, PhoneCreationAttributes> implements PhoneAttributes {
  id!: number;
  number!: string;
  contact_id?: number;

  // Phone belongsTo Contact via contact_id
  contact!: Contact;
  getContact!: Sequelize.BelongsToGetAssociationMixin<Contact>;
  setContact!: Sequelize.BelongsToSetAssociationMixin<Contact, ContactId>;
  createContact!: Sequelize.BelongsToCreateAssociationMixin<Contact>;

  static initModel(sequelize: Sequelize.Sequelize): typeof Phone {
    return sequelize.define('Phone', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    number: {
      type: DataTypes.STRING(14),
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
    tableName: 'phones',
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
        name: "phones_contacts_id_fk",
        using: "BTREE",
        fields: [
          { name: "contact_id" },
        ]
      },
    ]
  }) as typeof Phone;
  }
}
