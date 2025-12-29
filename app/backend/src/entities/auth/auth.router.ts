import { AuthController } from './auth.controller';
import { InputLoginSchema, InputRegisterSchema } from './auth.schema';
import express from 'express';
import { VALIDATION_SOURCES } from '~/constants';
import { validateRequest } from '~/middlewares';

export const authRouter = express.Router();
const authController = new AuthController();

authRouter.post('/register', validateRequest(InputRegisterSchema, VALIDATION_SOURCES.Body), authController.register);
authRouter.post('/login', validateRequest(InputLoginSchema, VALIDATION_SOURCES.Body), authController.login);
authRouter.post('/refresh', authController.refresh);
authRouter.post('/logout', authController.logout);
