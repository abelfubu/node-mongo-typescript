import { Doctor } from '../models/doctor';
import fs from 'fs';
import { Document } from 'mongoose';
import { Hospital } from '../models/hospital';
import { User } from '../models/user';

const manageNewImage = async (
  entity: string,
  newEntry: Document | null,
  filename: string
) => {
  if (!newEntry) return false;
  const oldPath = `./uploads/${entity}/${newEntry.get('img')}`;
  if (fs.existsSync(oldPath)) {
    fs.unlinkSync(oldPath);
  }

  newEntry.set('img', filename);
  await newEntry.save();
  return true;
};

export const updateImage = async (entity: string, id: string, filename: string) => {
  switch (entity) {
    case 'doctors':
      const doctor = await Doctor.findById(id);
      return manageNewImage(entity, doctor, filename);

    case 'hospitals':
      const hospital = await Hospital.findById(id);
      return manageNewImage(entity, hospital, filename);

    case 'users':
      const user = await User.findById(id);
      return manageNewImage(entity, user, filename);

    default:
      return false;
  }
};
