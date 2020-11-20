import { Router } from 'express';
import { verifyToken } from '../middleware/verify.token';
import * as controller from '../controllers/search.controller'; 

export const router = Router();

router.get('/:value', verifyToken, controller.search)
router.get('/collection/:entity/:value', verifyToken, controller.searchCollection)