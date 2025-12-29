import express from 'express';
import { authRouter } from '~/entities/auth';
import { itemsRouter } from '~/entities/items';

export const router = express.Router();

router.use('/auth', authRouter);
router.use(itemsRouter);
