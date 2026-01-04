import express from 'express';
import { authRouter } from '~/entities/auth';
import { itemsRouter } from '~/entities/items';
import { meRouter } from '~/entities/me';

export const router = express.Router();

router.use('/me', meRouter);
router.use('/auth', authRouter);
router.use(itemsRouter);
