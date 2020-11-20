import { Router } from 'express';
import { check } from 'express-validator';
import * as controller from '../controllers/hospital.controllers';
import { fieldValidator } from '../middleware/field.validator';
import { verifyToken } from '../middleware/verify.token';

export const router = Router();

const validators = [
  verifyToken,
  check('name', 'The field must be a valid Hospital name...').not().isEmpty(),
  fieldValidator,
];

router.get('/', controller.getAll);
router.post('/', validators, controller.addOne);
router.get('/:id', controller.getOne);
router.patch('/:id', controller.updateOne);
router.delete('/:id', controller.deleteOne);
