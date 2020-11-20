import { RequestHandler, Response } from 'express';
import { DecToken } from '../middleware/verify.token';
import { Doctor } from '../models/doctor';
import { ServerResponse } from '../models/ServerResponse';

export const getAll: RequestHandler = async (req, res): Promise<Response> => {
  try {
    const result = await Doctor.find()
      .populate('user', 'name img')
      .populate('hospital', 'name img');

    return res.status(200).json({ success: true, result });
  } catch (error) {
    console.log(error);
    return res.status(500).json(new ServerResponse(false));
  }
};

export const getOne: RequestHandler = async (req, res): Promise<Response> => {
  try {
    const result = await Doctor.findById(req.params.id);
    return res.status(200).json({ success: true, result });
  } catch (error) {
    throw new Error(error);
  }
};

export const addOne: RequestHandler = async (req, res): Promise<Response> => {
  try {
    if (!req.user) return res.status(401).json(new ServerResponse(false, 'Unauthorized'));
    req.body.user = (req.user as DecToken).id;
    const newEntry = new Doctor(req.body);
    const result = await newEntry.save();
    return res.status(201).json({ success: true, result });
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteOne: RequestHandler = async (req, res): Promise<Response> => {
  try {
    const result = await Doctor.findByIdAndDelete(req.params.id);
    if (!result)
      return res.status(404).json({ success: false, message: 'Doctor not found...' });
    return res.status(200).json({ success: true, result });
  } catch (error) {
    throw new Error(error);
  }
};

export const updateOne: RequestHandler = async (req, res): Promise<Response> => {
  try {
    const result = await Doctor.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!result)
      return res.status(404).json({ success: false, message: 'Doctor not found...' });
    return res.status(200).json({ success: true, result });
  } catch (error) {
    throw new Error(error);
  }
};
