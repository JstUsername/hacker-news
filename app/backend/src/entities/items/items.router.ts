import { ItemsController } from './items.controller';
import { InputCreateCommentSchema, InputItemSchema } from './items.schema';
import express from 'express';
import { VALIDATION_SOURCES } from '~/constants';
import { requireAuth, validateRequest } from '~/middlewares';

export const itemsRouter = express.Router();
const itemsController = new ItemsController();

itemsRouter.get('/items/:id', validateRequest(InputItemSchema, VALIDATION_SOURCES.Params), itemsController.getItem);
itemsRouter.get('/newest', itemsController.getNewest);
itemsRouter.post('/items/generate', itemsController.generateItems);

itemsRouter.post(
  '/items/:id/comments',
  requireAuth,
  validateRequest(InputItemSchema, VALIDATION_SOURCES.Params),
  validateRequest(InputCreateCommentSchema, VALIDATION_SOURCES.Body),
  itemsController.addComment,
);

itemsRouter.delete(
  '/items/comments/:id',
  requireAuth,
  validateRequest(InputItemSchema, VALIDATION_SOURCES.Params),
  itemsController.deleteComment,
);
