import { Router } from 'express';
import { check } from 'express-validator';
import * as controller from '../controllers/doctor.controller';
import { fieldValidator } from '../middleware/field.validator';
import { verifyToken } from '../middleware/verify.token';

export const router = Router();

const validators = [
  verifyToken,
  check('name', 'The name field can not be empty...').not().isEmpty(),
  check('hospital', 'The hospital field is not valid...').isMongoId(),
  fieldValidator,
];

router.get('/', /* verifyToken, */ controller.getAll);
router.post('/', validators, controller.addOne);
router.get('/:id', /* verifyToken, */ controller.getOne);
router.patch('/:id', /* verifyToken, */ controller.updateOne);
router.delete('/:id', /* verifyToken, */ controller.deleteOne);
