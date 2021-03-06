import { Schema, model } from 'mongoose';

const UserSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  img: String,
  role: {
    type: String,
    required: true,
    default: 'USER_ROLE',
  },
  google: {
    type: Boolean,
    default: false,
  },
});

export const User = model('User', UserSchema);
