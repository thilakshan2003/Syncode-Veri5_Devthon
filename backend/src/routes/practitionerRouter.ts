import express from 'express';
import { getPractitioners } from '../controllers/practitionerController.js';

const router = express.Router();

router.get('/', getPractitioners);

export default router;