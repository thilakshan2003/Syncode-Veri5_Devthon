import type { Request, Response } from 'express';
import * as practitionerService from '../services/practitionerService.js';

export const getPractitioners = async (_req: Request, res: Response) => {
  try {
    const practitioners = await practitionerService.getAllPractitioners();
    res.json(practitioners);
  } catch (error) {
    console.error('Error fetching practitioners:', error);
    res.status(500).json({ error: 'Failed to fetch practitioners' });
  }
};