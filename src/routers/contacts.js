import { Router } from 'express';
import {
  createContactController,
  deleteContactController,
  getContactByIdController,
  getContactsController,
  patchContactController,
  upsertContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

import {
  createContactSchema,
  updateContactSchema,
} from '../validation/contacts.js';
import { isValidId } from '../midlewares/isValidId.js';
import { validateBody } from '../midlewares/validateBody.js';
import { authenticate } from '../midlewares/authenticate.js';
import { upload } from '../midlewares/multer.js';


const router = Router();

router.use(authenticate);

router.get('/', ctrlWrapper(getContactsController));


router.get(
  '/:contactId',
  isValidId,
  ctrlWrapper(getContactByIdController),
);


router.post(
  '/register',
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
);

router.post(
  '/',
  /* isValidId, */
  upload.single('photo'),
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
);

router.delete(
  '/:contactId',
  isValidId,
  ctrlWrapper(deleteContactController),
);


router.put(
  '/:contactId',
  isValidId,
  upload.single('photo'),
  validateBody(updateContactSchema),
  ctrlWrapper(upsertContactController),
);


router.patch(
  '/:contactId',
  isValidId,
  upload.single('photo'),
  validateBody(updateContactSchema),
  ctrlWrapper(patchContactController),
);




export default router;
