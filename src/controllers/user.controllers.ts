import { RequestHandler, Response } from 'express';
import { User } from '../models/user';
import { genSalt, hash } from 'bcryptjs';

export const getAll: RequestHandler = async (req, res): Promise<Response> => {
  try {
    const { from = 0, pageSize = 0 } = req.query;
    const [ result, total ] = await Promise.all([
      User.find().select('-password').skip(+from).limit(+pageSize),
      User.countDocuments(),
    ]);
    return res.status(200).json({ success: true, result, total });
  } catch (error) {
    throw new Error(error);
  }
};

export const getOneById: RequestHandler = async (req, res): Promise<Response> => {
  try {
    const user = await User.findById(req.params.id);
    return res.status(200).json({ success: true, user });
  } catch (error) {
    throw new Error(error);
  }
};

export const addOne: RequestHandler = async (req, res): Promise<Response> => {
  try {
    const { password } = req.body;
    const salt = await genSalt(2);
    req.body.password = await hash(password.toString(), salt);

    const user = new User(req.body);
    const response = await user.save();
    return res.status(201).json({ success: true, response });
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteOne: RequestHandler = async (req, res): Promise<Response> => {
  try {
    const user = await User.findByIdAndDelete(req.params.id).select('-password');
    if (!user)
      return res.status(404).json({ success: false, message: 'User not found...' });
    return res.status(200).json({ success: true, user });
  } catch (error) {
    throw new Error(error);
  }
};

export const updateOne: RequestHandler = async (req, res): Promise<Response> => {
  try {
    const { password, google, ...body } = req.body;
    const user = await User.findByIdAndUpdate(req.params.id, body, { new: true }).select(
      '-password'
    );
    if (!user)
      return res.status(404).json({ success: false, message: 'User not found...' });
    return res.status(200).json({ success: true, updatedUser: user });
  } catch (error) {
    throw new Error(error);
  }
};
