
const VALID_CONTACT_TYPES = ['work', 'home', 'personal'];


const parseContactType = (contactType) => {
  if (typeof contactType !== 'string') return;

  if (VALID_CONTACT_TYPES.includes(contactType)) {
    return contactType;
  }
};


const parseIsFavourite = (isFavourite) => {
  if (typeof isFavourite !== 'string') return;

  if (isFavourite === 'true') return true;
  if (isFavourite === 'false') return false;
};


export const parseFilterParams = (query) => {
  const { contactType, isFavourite } = query;

  const parsedType = parseContactType(contactType);
  const parsedIsFavourite = parseIsFavourite(isFavourite);

  return {
    contactType: parsedType,
isFavourite: parsedIsFavourite};

};
