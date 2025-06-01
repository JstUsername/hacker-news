import express from 'express';
import { reseedDataController } from '~/controllers';
import { getItem, getNewest } from '~/entities/items';

export const router = express.Router();

router.post('/reseed-database', reseedDataController);

router.get('/newest', getNewest);

router.get('/item/:id', getItem);
