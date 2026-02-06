import { ResourceCategory } from '../../generated/prisma/enums.js';
import { serializeBigInt } from '../utils/serialization.js';
import { prisma } from '../config/db.js';

export const ResourceService = {
    /**
     * Fetches resources from the database based on the provided category.
     * If no category is provided, it returns all resources.
     * 
     * @param category - The ResourceCategory to filter by.
     * @returns A promise that resolves to an array of serialized resources.
     */
    async getResourcesByCategory(category?: string) {
        const where: any = {};
        if (category && Object.values(ResourceCategory).includes(category as ResourceCategory)) {
            where.category = category as ResourceCategory;
        }

        const resources = await prisma.resource.findMany({
            where,
            orderBy: { createdAt: 'desc' }
        });

        return serializeBigInt(resources);
    }
};
