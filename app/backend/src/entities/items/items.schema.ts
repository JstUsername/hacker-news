import { z } from 'zod';

export const InputItemSchema = z.object({
  id: z.preprocess((val) => Number(val), z.number().positive()),
});
