import { InputLoginSchema, InputRegisterSchema } from './auth.schema';
import { z } from 'zod';

export type InputRegister = z.infer<typeof InputRegisterSchema>;

export type InputLogin = z.infer<typeof InputLoginSchema>;
