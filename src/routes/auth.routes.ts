import { Router } from 'express';
import { check } from 'express-validator';
import * as controller from '../controllers/auth.controllers';
import { fieldValidator } from '../middleware/field.validator';
import { googleVerify } from '../middleware/googleAuth';
import { verifyToken } from '../middleware/verify.token';

export const router = Router();

const validators = [
  check('email', 'The field must be a valid email...').isEmail(),
  check('password', 'The password field can not be empty...').not().isEmpty(),
  fieldValidator,
];

router
  .get('/refresh', verifyToken, controller.refresh)
  .post('/login', validators, controller.login)
  .post('/login/google', googleVerify, controller.loginGoogle);
