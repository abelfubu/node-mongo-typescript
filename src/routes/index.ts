import { router as userRoutes } from './user.routes';
import { router as authRoutes } from './auth.routes';
import { Router } from 'express';

export const router = Router();

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
