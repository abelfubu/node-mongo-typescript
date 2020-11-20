import { Schema, model } from 'mongoose';

const HospitalSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    img: String,
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { collection: 'hospitals' }
);

export const Hospital = model('Hospital', HospitalSchema);
