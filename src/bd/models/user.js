
import { model, Schema } from "mongoose";
import { emailRegexp } from "../../constans/index.js";

const usersSchema = new Schema(
    {
name: {type: String, required: true},
email: {type: String, unique: true, match: emailRegexp, required: true},
password: {type: String, required: true},
},
{ timestamps: true, versionKey: false },
);

usersSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj.password;
    return obj;
  };

export const UsersCollection = model('users', usersSchema);
