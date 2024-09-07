import createHttpError from "http-errors";
import { createContact, deleteContact, getAllContacts, getContactById, updateContact } from "../services/contacts.js";
import { parsePaginationParams } from "../utils/parsePaginationParams.js";

export const getContactsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);

  // Отримуємо контакти та дані пагінації
  const {
    data: contacts,
    totalItems,
    totalPages,
    hasPreviousPage,
    hasNextPage,
  } = await getAllContacts({ page, perPage });

  // Відправляємо відповідь
  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: {
      data: contacts,
      page,
      perPage,
      totalItems,
      totalPages,
      hasPreviousPage,
      hasNextPage,
    },
  });
};

export const getContactByIdController = async (req, res) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);

  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }
  res.status(200).json({
    status: 200,
    message: 'Successfully found contact with id {contactId}!',
    data: contact,
  });
};

export const createContactController = async (req, res) => {
  const contact = await createContact(req.body);
   res.status(201).json({
     status: 201,
     message: `Successfully created a contact!`,
     data: contact,
   });
};

export const upsertContactController = async (req, res, next) => {
  const { contactId } = req.params;

  const result = await updateContact(contactId, req.body, {
    upsert: true,
    new: true,
  });

  if (!result) {
    return next(createHttpError(404, 'Contact not found'));
  }

  const status = result.isNew ? 201 : 200;

  res.status(status).json({
    status,
    message: 'Successfully upserted a contact!',
    data: result.contact,
  });
};

export const patchContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await updateContact(contactId, req.body);
  if (!result) {
     throw createHttpError(404, 'Contact not found');
  }
    res.json({
      status: 200,
      message: 'Successfully patched a contact!',
      data: result.contact,
    });
};

export const deleteContactController = async (req, res, next) => {
  const { contactId } = req.params;

  const contact = await deleteContact(contactId);
   if (!contact) {
     throw createHttpError(404, 'Contact not found');
    }
   res.status(204).send();
};


