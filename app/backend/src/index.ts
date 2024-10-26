import { sequelize } from './db';
import express from 'express';
import { styleText } from 'node:util';

const app = express();
const host = process.env.EXPRESS_HOST || 'localhost';
const port = process.env.EXPRESS_PORT || 3001;

app.use(express.json());

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(port, () => {
      console.info(styleText('green', `Express started: http://${host}:${port}`));
    });
  } catch (e) {
    console.error(e);
  }
};

await start();
