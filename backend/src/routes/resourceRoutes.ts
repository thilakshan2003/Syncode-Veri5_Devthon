import { Router } from 'express';
import { getResources } from '../controllers/resourceController.js';

const router = Router();

// GET /api/resources?category=SAFE_SEX - Fetch resources by category
router.get('/', getResources);

export default router;
