import { MeController } from './me.controller';
import express from 'express';
import { VALIDATION_SOURCES } from '~/constants';
import { InputMeSchema } from '~/entities/me/me.schema';
import { validateRequest } from '~/middlewares';

export const meRouter = express.Router();
const meController = new MeController();

meRouter.get('/', validateRequest(InputMeSchema, VALIDATION_SOURCES.Cookies), meController.getMe);
