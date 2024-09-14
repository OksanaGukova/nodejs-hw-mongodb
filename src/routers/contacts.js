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


const router = Router();


router.get('/contacts', ctrlWrapper(getContactsController));


router.get(
  '/:contactId',
  isValidId,
  ctrlWrapper(getContactByIdController),
);


router.post(
  './register',
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
)

router.post(
  '/contacts',
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
);


router.put(
  '/:contactId',
  isValidId,
  validateBody(updateContactSchema),
  ctrlWrapper(upsertContactController),
);


router.patch(
  '/:contactId',
  isValidId,
  validateBody(updateContactSchema),
  ctrlWrapper(patchContactController),
);


router.delete(
  '/:contactId',
  isValidId,
  ctrlWrapper(deleteContactController),
);

export default router;
