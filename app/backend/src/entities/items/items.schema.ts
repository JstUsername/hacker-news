import { z } from 'zod';

export const InputItemSchema = z.object({
  id: z.preprocess((val) => Number(val), z.number().positive()),
});

export const InputCreateCommentSchema = z.object({
  content: z.string().min(1),
});
