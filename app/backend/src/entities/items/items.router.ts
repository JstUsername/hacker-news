import { ItemsController } from './items.controller';
import { InputItemSchema } from './items.schema';
import express from 'express';
import { VALIDATION_SOURCES } from '~/constants';
import { validateRequest } from '~/middlewares';

export const itemsRouter = express.Router();
const itemsController = new ItemsController();

itemsRouter.get('/items/:id', validateRequest(InputItemSchema, VALIDATION_SOURCES.Params), itemsController.getItem);
itemsRouter.get('/newest', itemsController.getNewest);
itemsRouter.post('/items/generate', itemsController.generateItems);
