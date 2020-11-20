import { RequestHandler, Response } from "express";
import { Document } from "mongoose";
import { Doctor } from "../models/doctor";
import { ServerResponse } from "../models/ServerResponse";
import { Hospital } from "../models/hospital";
import { User } from "../models/user";

export const search: RequestHandler = async (req, res, next): Promise<Response> => {
  try {
    const regex = new RegExp(req.params.value, 'i');
    const [ users, doctors, hospitals ] = await Promise.all([
      User.find({ name: regex }),
      Doctor.find({ name: regex }),
      Hospital.find({ name: regex }),
    ])
    return res.status(200).json({ success: true, users, doctors, hospitals });
  } catch (error) {
    console.log(error);
    return res.status(500).json(new ServerResponse(false));
  }
}

export const searchCollection: RequestHandler = async (req, res, next): Promise<Response> => {
  try {
    const { entity, value } = req.params;
    const regex = new RegExp(value, 'i');
    let data: Document[] = [];
    switch (entity) {
      case 'user':
        data = await User.find({ name: regex });
        break;
      
      case 'hospital':
        data = await Hospital.find({ name: regex });
        break;
      
      case 'doctor':
        data = await Doctor.find({ name: regex });
        break;
      
      default:
        const message = 'Specify a valid entity, user / hospital / doctor';
        res.status(400).json(new ServerResponse(false, message));
        break;      
    }
    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.log(error);
    return res.status(500).json(new ServerResponse(false));
  }
}
