import { RequestHandler } from 'express';
import { User } from '../models/user';

export const emailExist: RequestHandler = async (req, res, next) => {
  const { email } = req.body;
  if (!email) return next();
  const user = await User.findOne({ email });
  if (user)
    return res.status(400).json({ success: false, message: 'Email is already taken' });
  next();
};
