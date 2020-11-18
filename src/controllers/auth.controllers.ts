import { RequestHandler, Response } from 'express';
import { compare, compareSync } from 'bcryptjs';
import { User } from '../models/user';
import { createToken } from '../utils/jwt';

export const login: RequestHandler = async (req, res): Promise<Response> => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    const validPassword = await compare(password.toString(), user.get('password'));
    if (!validPassword)
      return res.status(404).json({ success: false, message: 'Password is not correct' });
    const token = await createToken(user.get('_id'));
    return res.status(200).json({ success: true, token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error });
  }
};
