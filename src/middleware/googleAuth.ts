import { RequestHandler } from 'express';

import { OAuth2Client } from 'google-auth-library';
import { ServerResponse } from '../models/ServerResponse';

export const googleVerify: RequestHandler = async (req, res, next) => {
  try {
    const client = new OAuth2Client(process.env.GOOGLE_ID);
    if (!req.body.token)
      return res.status(401).json(new ServerResponse(false, 'No token provided...'));
    const ticket = await client.verifyIdToken({
      idToken: req.body.token,
      audience: process.env.GOOGLE_ID,
    });
    const payload = ticket.getPayload();
    if (!payload)
      return res.status(401).json(new ServerResponse(false, 'Unauthorized...'));

    req.body.payload = payload;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json(new ServerResponse(false));
  }
};
