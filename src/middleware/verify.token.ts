import { RequestHandler } from 'express';
import { verify } from 'jsonwebtoken';

export interface DecToken {
  id: string;
}

export const verifyToken: RequestHandler = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token)
    return res.status(401).json({ success: false, message: 'No token provided...' });
  verify(token, process.env.SECRET as string, (error, decoded) => {
    if (error)
      return res
        .status(401)
        .json({ success: false, message: 'Invalid token provided...' });
    req.user = decoded as DecToken;
    next();
  });
};
