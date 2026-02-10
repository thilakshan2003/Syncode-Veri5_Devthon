import { Router } from 'express';
import { getTestTypes } from '../controllers/testTypeController.js';

const router = Router();

/**
 * Get all active test types
 * No authentication required - public endpoint for form dropdowns
 */
router.get('/', getTestTypes);

export default router;
