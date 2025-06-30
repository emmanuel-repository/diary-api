import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Email, EmailId } from './email';
import type { Phone, PhoneId } from './phone';

export interface ContactAttributes {
  id: number;
  name: string;
  fathers_surname: string;
  mothers_surname: string;
  birthdate: string;
  alias: string;
  profile_image?: string;
}

export type ContactPk = "id";
export type ContactId = Contact[ContactPk];
export type ContactOptionalAttributes = "id" | "profile_image";
export type ContactCreationAttributes = Optional<ContactAttributes, ContactOptionalAttributes>;

export class Contact extends Model<ContactAttributes, ContactCreationAttributes> implements ContactAttributes {
  id!: number;
  name!: string;
  fathers_surname!: string;
  mothers_surname!: string;
  birthdate!: string;
  alias!: string;
  profile_image?: string;

  // Contact hasMany Email via contact_id
  emails!: Email[];
  getEmails!: Sequelize.HasManyGetAssociationsMixin<Email>;
  setEmails!: Sequelize.HasManySetAssociationsMixin<Email, EmailId>;
  addEmail!: Sequelize.HasManyAddAssociationMixin<Email, EmailId>;
  addEmails!: Sequelize.HasManyAddAssociationsMixin<Email, EmailId>;
  createEmail!: Sequelize.HasManyCreateAssociationMixin<Email>;
  removeEmail!: Sequelize.HasManyRemoveAssociationMixin<Email, EmailId>;
  removeEmails!: Sequelize.HasManyRemoveAssociationsMixin<Email, EmailId>;
  hasEmail!: Sequelize.HasManyHasAssociationMixin<Email, EmailId>;
  hasEmails!: Sequelize.HasManyHasAssociationsMixin<Email, EmailId>;
  countEmails!: Sequelize.HasManyCountAssociationsMixin;
  // Contact hasMany Phone via contact_id
  phones!: Phone[];
  getPhones!: Sequelize.HasManyGetAssociationsMixin<Phone>;
  setPhones!: Sequelize.HasManySetAssociationsMixin<Phone, PhoneId>;
  addPhone!: Sequelize.HasManyAddAssociationMixin<Phone, PhoneId>;
  addPhones!: Sequelize.HasManyAddAssociationsMixin<Phone, PhoneId>;
  createPhone!: Sequelize.HasManyCreateAssociationMixin<Phone>;
  removePhone!: Sequelize.HasManyRemoveAssociationMixin<Phone, PhoneId>;
  removePhones!: Sequelize.HasManyRemoveAssociationsMixin<Phone, PhoneId>;
  hasPhone!: Sequelize.HasManyHasAssociationMixin<Phone, PhoneId>;
  hasPhones!: Sequelize.HasManyHasAssociationsMixin<Phone, PhoneId>;
  countPhones!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof Contact {
    return sequelize.define('Contact', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    fathers_surname: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    mothers_surname: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    birthdate: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    alias: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    profile_image: {
      type: DataTypes.STRING(400),
      allowNull: true
    }
  }, {
    tableName: 'contacts',
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
    ]
  }) as typeof Contact;
  }
}
