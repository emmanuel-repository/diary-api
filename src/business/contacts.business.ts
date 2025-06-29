import { ContactDto } from './../dtos/contact.dto';
import { db, sequelize } from "../configs/database.config";
import { mapContactToDto } from '../mappers/contact.mapper';
import { ConflictError, NotFoundError } from '../errors/custom-errors';
import { EmailDto } from '../dtos/email.dto';
import { PhoneDto } from '../dtos/phone.dto';
import { mapEmailToDto } from '../mappers/email.mapper';
import { mapPhoneToDto } from '../mappers/phone.mapper';
import { Contact, Email, Phone } from '../models/init-models';
import { Op } from 'sequelize';

export default class ContactBusiness {

  async getListContacts(): Promise<ContactDto[]> {

    const dbContacts = await db.Contact.findAll({
      include: [
        { model: db.Email, as: 'emails' },
        { model: db.Phone, as: 'phones' }
      ]
    });

    const contacts = await dbContacts.map(mapContactToDto);

    return contacts;
  }

  async createContact(contactData: any): Promise<ContactDto | null> {
    const t = await sequelize.transaction();

    try {
      await this.ensureAliasIsUnique(contactData.alias);

      const contact = await this.createContactRecord(contactData, t);
      const contactDto = mapContactToDto(contact);

      if (contactData.emails.length > 0) {
        const emails = await this.createEmails(contactData.emails, contact.id, t);
        contactDto.emails = emails.map(mapEmailToDto);
      }

      if (contactData.phones.length > 0) {
        const phones = await this.createPhones(contactData.phones, contact.id, t);
        contactDto.phones = phones.map(mapPhoneToDto);
      }

      await t.commit();

      return contactDto;

    } catch (error) {

      await t.rollback();

      console.error('Transacción fallida, rollback realizado:', error);

      throw error;
    }
  }

  async deleteContact(contadId: number): Promise<number | undefined> {
    const t = await sequelize.transaction();
    try {

      const contact = await this.existRegister(contadId);

      await contact?.destroy();

      await t.commit();

      return contact?.id;

    } catch (error) {
      await t.rollback();
      throw error;
    }

  }

  async updateContact(contactId: number, contactData: any): Promise<ContactDto> {
    const t = await sequelize.transaction();
    try {

      const contact = await this.existRegister(contactId);

      await this.ensureAliasIsUnique(contactData.alias, contactId);

      const contactToUpdate = await this.updateContactRecord(contact, contactData, t);
      const contactMapper = mapContactToDto(contactToUpdate);

      if (contactData.emails.length > 0) {
        contactMapper.emails = (await this.updateEmails(contactData.emails, contactId, t)).map(mapEmailToDto);
      }

      if (contactData.phones.length > 0) {
        contactMapper.phones = (await this.updatePhones(contactData.phones, contactId, t)).map(mapPhoneToDto);
      }

      await t.commit();

      return contactMapper;

    } catch (error) {
      await t.rollback();
      throw error
    }
  }

  async deleteEmail(emailId: number): Promise<number> {
    const t = await sequelize.transaction();
    try {

      const email = await this.existEmail(emailId);

      await email.destroy({ transaction: t });

      await t.commit();

      return email.id;

    } catch (error) {
      await t.rollback();
      throw error;
    }
  }

  async deletePhone(phoneId: number): Promise<number> {
    const t = await sequelize.transaction();

    try {
      const phone = await this.existPhone(phoneId);

      await phone.destroy({ transaction: t });

      await t.commit();

      return phone.id;

    } catch (error) {
      await t.rollback();
      throw error;
    }
  }

  async existRegister(contatId: number): Promise<Contact | null> {
    const exist = await db.Contact.findByPk(contatId, {
      include: [
        { model: db.Email, as: 'emails' },
        { model: db.Phone, as: 'phones' }
      ]
    });
    if (!exist) throw new NotFoundError("Contacto no encontrado");
    return exist;
  }

  private async ensureAliasIsUnique(alias: string, currentContactId?: number): Promise<void> {
    const exists = await db.Contact.findOne({
      where: { alias, ...(currentContactId ? { id: { [Op.ne]: currentContactId } } : {}) }
    });

    if (exists) throw new ConflictError('El alias ya se encuentra registrado por otro contacto');
  }

  private async existEmail(emailId: number): Promise<Email> {
    const exist = await db.Email.findByPk(emailId);
    if (!exist) throw new NotFoundError("Email no encontrado");
    return exist;
  }

  private async existPhone(phoneId: number): Promise<Phone> {
    const exist = await db.Phone.findByPk(phoneId);
    if (!exist) throw new NotFoundError("Teléfono no encontrado");
    return exist;
  }

  private async createContactRecord(data: any, t: any) {
    return await db.Contact.create({
      name: data.name,
      fathers_surname: data.fathers_surname,
      mothers_surname: data.mothers_surname,
      birthdate: data.birthdate,
      alias: data.alias
    }, { transaction: t });
  }

  private async updateContactRecord(contact: any, newData: any, t: any) {
    return await contact.update({
      name: newData.name,
      fathers_surname: newData.fathers_surname,
      mothers_surname: newData.mothers_surname,
      birthdate: newData.birthdate,
      alias: newData.alias
    }, { transaction: t });
  }

  private async createEmails(emails: EmailDto[], contactId: number, t: any) {

    const data = emails.map(e => ({
      email: e.email,
      contact_id: contactId
    }));

    return await db.Email.bulkCreate(data, { transaction: t });
  }

  private async updateEmails(emails: EmailDto[], contactId: number, t: any) {

    const emailsToUpdate = emails.filter(e => e.id != null);
    const emailsToCreate = emails.filter(e => e.id == null);

    await Promise.all(
      emailsToUpdate.map(e => db.Email.update(
        { email: e.email },
        { where: { id: e.id }, transaction: t }
      ))
    );

    await db.Email.bulkCreate(
      emailsToCreate.map(e => ({
        email: e.email,
        contact_id: contactId
      })),
      { transaction: t }
    );

    const allEmails = await db.Email.findAll({
      where: { contact_id: contactId },
      transaction: t
    });

    return allEmails;
  }

  private async createPhones(phones: PhoneDto[], contactId: number, t: any) {

    const data = phones.map(p => ({
      number: p.number,
      contact_id: contactId
    }));

    return await db.Phone.bulkCreate(data, { transaction: t });
  }

  private async updatePhones(phones: PhoneDto[], contactId: number, t: any) {
    const phonesToUpdate = phones.filter(p => p.id != null);
    const phonesToCreate = phones.filter(p => p.id == null);

    await Promise.all(
      phonesToUpdate.map(p =>
        db.Phone.update(
          { number: p.number },
          { where: { id: p.id }, transaction: t }
        )
      )
    );

    await db.Phone.bulkCreate(
      phonesToCreate.map(p => ({
        number: p.number,
        contact_id: contactId
      })),
      { transaction: t }
    );

    const allPhones = await db.Phone.findAll({
      where: { contact_id: contactId },
      transaction: t
    });

    return allPhones;
  }

}
