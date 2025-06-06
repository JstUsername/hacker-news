import cors from 'cors';
import express from 'express';
import { styleText } from 'node:util';
import { seedDatabase, sequelize } from '~/db';
import { router } from '~/router';

const app = express();
const host = process.env.EXPRESS_HOST || 'localhost';
const port = process.env.EXPRESS_PORT || 3001;

app.use(cors());
app.use(express.json());
app.use('/api', router);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    await seedDatabase();

    app.listen(port, () => {
      console.info(styleText('green', `Express started: http://${host}:${port}/`));
    });
  } catch (e) {
    console.error(e);
  }
};

void start();
