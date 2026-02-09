import express from 'express';
import * as practitionerController from '../controllers/practitionerController.js';

const router = express.Router();

router.get('/', practitionerController.getPractitioners);

export default router;
