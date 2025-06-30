import { Request, Response } from 'express';
import ContactBusiness from '../business/contacts.business';
import { profile } from 'console';
import path from 'path';

export default class ContactController {

  private static contactBusiness = new ContactBusiness();

  static async getAllRegisters(req: Request, res: Response): Promise<any> {

    const listContact = await this.contactBusiness.getListContacts();

    return res.status(200).json(listContact);

  }

  static async getRegisterById(req: Request, res: Response, next: any): Promise<any> {
    try {
      const { id } = req.params;
      const contact = await this.contactBusiness.existRegister(Number(id));

      return res.status(200).json(contact);
    } catch (error) {
      next(error)
    }
  }

  static async createContact(req: Request, res: Response, next: any): Promise<any> {

    try {

      const data = req.body;
      const file = req.file;

      const createContact = await this.contactBusiness.createContact(data, file);

      return res.status(201).json(createContact);

    } catch (error) {

      next(error);

    }
  }

  static async deleteContact(req: Request, res: Response, next: any): Promise<any> {

    try {

      const { id } = req.params;
      const contactId = await this.contactBusiness.deleteContact(Number(id));

      return res.status(200).json(contactId);

    } catch (error) {
      next(error);
    }

  }

  static async updateContact(req: Request, res: Response, next: any): Promise<any> {
    try {

      const { id } = req.params;
      const contactData = req.body;
      const dataContactToCreate = await this.contactBusiness.updateContact(Number(id), contactData);

      return res.status(200).json(dataContactToCreate);

    } catch (error) {
      next(error);
    }
  }

  static async deleteEmail(req: Request, res: Response, next: any): Promise<any> {

    try {

      const { id } = req.params;
      const contactId = await this.contactBusiness.deleteEmail(Number(id));

      return res.status(200).json(contactId);

    } catch (error) {
      next(error);
    }
  }

  static async deletePhone(req: Request, res: Response, next: any): Promise<any> {

    try {

      const { id } = req.params;
      const contactId = await this.contactBusiness.deletePhone(Number(id));

      return res.status(200).json(contactId);

    } catch (error) {
      next(error);
    }
  }

}