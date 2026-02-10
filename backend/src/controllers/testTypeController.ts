import type { Request, Response } from 'express';
import { getAllTestTypes} from '../services/testTypeService.js';

/**
 * Get all test types
 */
export const getTestTypes = async (req: Request, res: Response) => {
    try {
        const testTypes = await getAllTestTypes();
        res.json({ success: true, testTypes });
    } catch (error: any) {
        console.error('Error fetching test types:', error);
        res.status(500).json({ error: 'Failed to fetch test types' });
    }
};

// /**
//  * Get test type by ID
//  */
// export const getTestType = async (req: Request, res: Response) => {
//     try {
//         const id = BigInt(req.params.id as string);
//         const testType = await getTestTypeById(id);
        
//         if (!testType) {
//             return res.status(404).json({ error: 'Test type not found' });
//         }
        
//         res.json({ success: true, testType });
//     } catch (error: any) {
//         console.error('Error fetching test type:', error);
//         res.status(500).json({ error: 'Failed to fetch test type' });
//     }
// };
