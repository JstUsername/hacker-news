import { StrongPasswordSchema } from '@hacker-news/shared';
import { z } from 'zod';

export const InputRegisterSchema = z.object({
  username: z.string().min(1).max(255),
  password: StrongPasswordSchema,
});

export const InputLoginSchema = z.object({
  username: z.string().min(1).max(255),
  password: z.string().min(1).max(255),
});
