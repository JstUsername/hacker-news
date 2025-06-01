import { Request, Response } from 'express';
import { styleText } from 'node:util';
import { STATUS_CODES } from '~/const';
import { seedDatabase } from '~/db';

export const reseedDataController = async (_req: Request, res: Response) => {
  try {
    await seedDatabase({ force: true });
    res.status(STATUS_CODES.Success).json({ message: 'Database reseed completed successfully' });
  } catch (err) {
    console.error(styleText('red', 'Failed to reseed the database.'), err);
    res.status(STATUS_CODES.InternalServerError).json({ error: 'Failed to reseed the database' });
  }
};
