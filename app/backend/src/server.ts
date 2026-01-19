import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { styleText } from 'node:util';
import { env } from '~/config/env';
import { CORS_WHITE_LIST, SERVER_URL } from '~/constants';
import { sequelize } from '~/databases';
import { CronService } from '~/entities/cron';
import { ItemsService } from '~/entities/items';
import { TokensService } from '~/entities/tokens';
import { errorHandler } from '~/middlewares';
import { router } from '~/router';

const app = express();
const itemsService = new ItemsService();
const tokensService = new TokensService();
const cronService = new CronService();

app.use(cookieParser());
app.use(cors({ credentials: true, origin: CORS_WHITE_LIST }));
app.use(helmet());
app.use(express.json());
app.use('/api', router);
app.use(errorHandler);

const start = async () => {
  try {
    await sequelize.authenticate();
    await itemsService.generateItems();
    await tokensService.deleteAllExpiredTokens();
    await cronService.initCron();
    app.listen(env.EXPRESS_PORT, () => console.info(styleText('green', `Express started: ${SERVER_URL}`)));
  } catch (err) {
    console.error(err);
  }
};

void start();
