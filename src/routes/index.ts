import { Router, json } from 'express';
import fileUpload from 'express-fileupload';
import { router as userRoutes } from './user.routes';
import { router as authRoutes } from './auth.routes';
import { router as hospitalRoutes } from './hospital.routes';
import { router as doctorRoutes } from './doctor.routes';
import { router as searchRoutes } from './search.routes';
import { router as uploadRoutes } from './uploads.routes';

// default options

export const router = Router();

router.use(json());
router.use(fileUpload());

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/hospitals', hospitalRoutes);
router.use('/doctors', doctorRoutes);
router.use('/search', searchRoutes);
router.use('/upload', uploadRoutes);
