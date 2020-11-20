import { Schema, model } from 'mongoose';

const DoctorSchema: Schema = new Schema(
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
    hospital: {
      type: Schema.Types.ObjectId,
      ref: 'Hospital',
      required: true,
    },
  },
  { collection: 'doctors' }
);

export const Doctor = model('Doctor', DoctorSchema);
