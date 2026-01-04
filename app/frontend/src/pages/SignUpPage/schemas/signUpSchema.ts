import { StrongPasswordSchema } from '@hacker-news/packages/shared';
import { z } from 'zod';

export const signUpSchema = z
  .object({
    username: z.string().min(1, 'Username is required').max(255, 'Username is too long'),
    password: StrongPasswordSchema,
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type SignUpFormData = z.infer<typeof signUpSchema>;
