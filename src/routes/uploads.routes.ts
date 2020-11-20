import { Router } from 'express';
import { verifyToken } from '../middleware/verify.token';
import * as controller from '../controllers/uploads.controller';

export const router = Router();

router
  .get('/:entity/:id', controller.getImage)
  .put('/:entity/:id', verifyToken, controller.upload);
