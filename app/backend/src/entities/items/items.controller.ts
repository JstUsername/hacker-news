import { ItemsService } from './items.service';
import { NextFunction, Request, Response } from 'express';
import { STATUS_CODES } from '~/constants';

const itemsService = new ItemsService();

export class ItemsController {
  async getNewest(_req: Request, res: Response, next: NextFunction) {
    try {
      const newest = await itemsService.getNewestNews();
      res.status(STATUS_CODES.Success).json(newest);
    } catch (err) {
      next(err);
    }
  }

  async getItem(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const item = await itemsService.getItemById(+id);
      res.status(STATUS_CODES.Success).json(item);
    } catch (err) {
      next(err);
    }
  }

  async generateItems(_req: Request, res: Response, next: NextFunction) {
    try {
      await itemsService.generateItems({ force: true });
      res.status(STATUS_CODES.Success).json({ message: 'Items successfully generated' });
    } catch (err) {
      next(err);
    }
  }
}
