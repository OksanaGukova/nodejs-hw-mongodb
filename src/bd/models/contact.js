import { model, Schema } from 'mongoose';
import { contactTypeList } from '../../constans/contacts.js';


const contactsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      email: String,
    },
    isFavourite: {
      type: Boolean,
      default: false,
    },
    contactType: {
      type: String,
      enum: contactTypeList,
      required: true,
      default: 'personal',
    },
  },
  {
    timestamps: true,
    versionKey: false
  },
);


export const contactsCollection = model('contact', contactsSchema);
