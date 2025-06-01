import { getItemById, getNewestNews } from './items.service';
import { Request, Response } from 'express';
import { styleText } from 'node:util';
import { AppError, BadRequestError, STATUS_CODES } from '~/const';

export const getNewest = async (_req: Request, res: Response) => {
  try {
    const newest = await getNewestNews();
    res.status(STATUS_CODES.Success).json(newest);
  } catch (err) {
    res.status(STATUS_CODES.InternalServerError).json({ error: 'Failed to retrieve the latest news' });
    console.error(styleText('red', 'Error retrieving the latest news.'), err);
  }
};

export const getItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const itemId = parseInt(id, 10);
    if (isNaN(itemId)) throw new BadRequestError('Invalid ID format');
    const item = await getItemById(itemId);
    res.status(STATUS_CODES.Success).json(item);
  } catch (err) {
    if (err instanceof AppError) {
      res.status(err.statusCode).json({ error: err.message });
    } else {
      res
        .status(STATUS_CODES.InternalServerError)
        .json({ error: 'An unexpected error occurred. Please try again later.' });

      console.error(styleText('red', 'Unexpected error:'), err);
    }
  }
};
