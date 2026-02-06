import type { Request, Response } from 'express';
import { ResourceService } from '../services/resourceService.js';

/**
 * Controller to fetch resources from the database.
 * Supports filtering by category via query parameter.
 */
export const getResources = async (req: Request, res: Response) => {
    try {
        const { category } = req.query;
        console.log(`[ResourceController] Fetching resources for category: ${category || 'All'}`);

        const resources = await ResourceService.getResourcesByCategory(category as string);

        res.json(resources);
    } catch (error: any) {
        console.error('[ResourceController] Error fetching resources:', error.message);
        res.status(500).json({
            error: 'Failed to fetch resources',
            details: error.message
        });
    }
};
