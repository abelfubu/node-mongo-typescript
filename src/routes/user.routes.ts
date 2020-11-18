import { Router } from 'express';
import { check } from 'express-validator';
import * as controller from '../controllers/user.controllers';
import { emailExist } from '../middleware/checkEmailExist';
import { fieldValidator } from '../middleware/field.validator';
import { verifyToken } from '../middleware/verify.token';

export const router = Router();

const validators = [
  check('name', 'The name field can not be empty...').not().isEmpty(),
  check('email', 'The field must be a valid email...').isEmail(),
  check('password', 'The password field can not be empty...').not().isEmpty(),
  fieldValidator,
  emailExist,
];

router
  .get('/', verifyToken, controller.getAll)
  .get('/:id', verifyToken, controller.getOneById)
  .post('/', validators, controller.addOne)
  .delete('/:id', verifyToken, controller.deleteOne)
  .patch('/:id', [verifyToken, ...validators], controller.updateOne);
