import { RequestHandler, Response } from 'express';
import { validationResult } from 'express-validator';

export const fieldValidator: RequestHandler = (req, res, next): Response | void => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ success: false, message: errors.mapped() });
  return next();
};
