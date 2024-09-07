import { contactsCollection } from "../bd/models/contact.js";
import { calculatePaginationData } from "../utils/calculatePaginationData.js";

export const getAllContacts = async ({ page, perPage }) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  // Виконуємо запит з пагінацією
  const contactsQuery = contactsCollection.find();
  const contactCount = await contactsCollection.countDocuments(); // Отримуємо загальну кількість документів
  const contacts = await contactsQuery.skip(skip).limit(limit).exec(); // Отримуємо документи з пагінацією

  // Розраховуємо дані для пагінації
  const paginationData = calculatePaginationData(contactCount, perPage, page);

  return {
    data: contacts,
    ...paginationData,
  };
};

export const getContactById = async (contactId) => {
    const contact = await contactsCollection.findById(contactId);
    return contact;
};

export const createContact = async (payload) => {
    const contact = await contactsCollection.create(payload);
    return contact;
};

export const updateContact = async (contactId, payload, options = {}) => {
  const rawResult = await contactsCollection.findOneAndUpdate(
    { _id: contactId },
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );

  if (!rawResult || !rawResult.value) return null;

  return {
    contact: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};

export const deleteContact = async (contactId) => {
    const contact = await contactsCollection.findOneAndDelete({ _id:contactId, });
    return contact;
};
