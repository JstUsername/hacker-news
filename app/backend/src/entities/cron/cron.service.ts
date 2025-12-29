import cron from 'node-cron';
import { EVERY_DAY_AT_MIDNIGHT } from '~/constants';
import { TokensService } from '~/entities/tokens';

const tokensService = new TokensService();

export class CronService {
  async initCron() {
    cron.schedule(EVERY_DAY_AT_MIDNIGHT, async () => {
      await tokensService.deleteAllExpiredTokens();
    });
  }
}
