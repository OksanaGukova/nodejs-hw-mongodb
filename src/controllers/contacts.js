import createHttpError from "http-errors";
import { createContact, deleteContact, getAllContacts, getContactById, updateContact } from "../services/contacts.js";
import { parsePaginationParams } from "../utils/parsePaginationParams.js";
import { parseSortParams } from "../utils/parseSortParams.js";
import { parseFilterParams } from "../utils/parseFilterParams.js";
import { saveFileToUploadDir } from "../utils/saveFileToUploadDir.js";
import { env } from "../utils/env.js";
import saveFileToCloudinary from "../utils/saveFileToCloudinary.js";


const enableCloudinary = env("ENABLE_CLOUDINARY");

export const getContactsController = async (req, res) => {

  const { page, perPage } = parsePaginationParams(req.query);
 const { sortBy, sortOrder } = parseSortParams(req.query);

 const filter = parseFilterParams(req.query);
   const {_id: userId} = req.user;


  const contacts = await getAllContacts({
    page, perPage, sortBy, sortOrder, filter: {...filter, userId}
  });

  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts
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

  let photo;

  if (req.file) {
    if (enableCloudinary === 'true') {
      photo = await saveFileToCloudinary(req.file, 'photo');
    } else {
      photo = await saveFileToUploadDir(req.file);
    }
  }


  const {_id: userId} = req.user;
  const contact = await createContact({ ...req.body, userId, photo });
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

  const result = await updateContact(contactId, {
    ...req.body,

  });

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

