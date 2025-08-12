import { z } from 'zod';

export const createCategorySchema = z.object({
  name: z.string().min(2).max(100),
  description: z.string().max(500).optional(),
  image: z.url().optional(),
  sortOrder: z.number().min(0).optional()
});
