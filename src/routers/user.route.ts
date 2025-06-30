import { Router } from "express";
import ContactController from "../controllers/constact.controller";
import { validate } from "../middlewares/validate.middleware";
import { ContactDtoSchema } from "../schemas/contact.schema";
import { upload } from "../middlewares/multer-handle.middleware";

const router = Router();

router.get('/user', ContactController.getAllRegisters.bind(ContactController));
router.get('/user/:id', ContactController.getRegisterById.bind(ContactController))
router.post('/user', upload.single('profile_image'), ContactController.createContact.bind(ContactController));
router.delete('/user/:id', ContactController.deleteContact.bind(ContactController));
router.put('/user/:id', upload.single('profile_image'), validate(ContactDtoSchema), ContactController.updateContact.bind(ContactController));
router.delete('/user/email/:id', ContactController.deleteEmail.bind(ContactController));
router.delete('/user/phone/:id', ContactController.deletePhone.bind(ContactController));

export default router;