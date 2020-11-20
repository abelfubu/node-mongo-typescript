import { RequestHandler, Response } from 'express';
import { Hospital } from '../models/hospital';
import { ServerResponse } from '../models/ServerResponse';
import { DecToken } from '../middleware/verify.token';

export const getAll: RequestHandler = async (req, res): Promise<Response> => {
  try {
    const result = await Hospital.find().populate('user', 'name img');
    return res.status(200).json({ success: true, result });
  } catch (error) {
    throw new Error(error);
  }
};

export const getOne: RequestHandler = async (req, res): Promise<Response> => {
  try {
    const result = await Hospital.findById(req.params.id);
    return res.status(200).json({ success: true, hospital: result });
  } catch (error) {
    throw new Error(error);
  }
};

export const addOne: RequestHandler = async (req, res): Promise<Response> => {
  try {
    if (!req.user) return res.status(401).json(new ServerResponse(false, 'Unauthorized'));
    req.body.user = (req.user as DecToken).id;
    const hospital = new Hospital(req.body);
    const response = await hospital.save();
    return res.status(201).json({ success: true, response });
  } catch (error) {
    console.log(error);
    return res.status(500).json(new ServerResponse(false));
  }
};

export const deleteOne: RequestHandler = async (req, res): Promise<Response> => {
  try {
    const result = await Hospital.findByIdAndDelete(req.params.id);
    if (!result)
      return res.status(404).json(new ServerResponse(false, 'Hospital not found...'));
    return res.status(200).json({ success: true, result });
  } catch (error) {
    throw new Error(error);
  }
};

export const updateOne: RequestHandler = async (req, res): Promise<Response> => {
  try {
    const result = await Hospital.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!result)
      return res.status(404).json({ success: false, message: 'Hospital not found...' });
    return res.status(200).json({ success: true, updatedHospital: result });
  } catch (error) {
    throw new Error(error);
  }
};
