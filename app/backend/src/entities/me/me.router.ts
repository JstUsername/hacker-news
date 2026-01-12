import { MeController } from './me.controller';
import express from 'express';

export const meRouter = express.Router();
const meController = new MeController();

meRouter.get('/', meController.getMe);
