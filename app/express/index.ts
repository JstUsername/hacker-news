import { sequalize } from './db';
import dotenv from 'dotenv';
import express from 'express';

dotenv.config();

const app = express();

const start = async () => {
  try {
    await sequalize.authenticate();
    await sequalize.sync();
    app.listen(process.env.EXPRESS_PORT || 3000, () => {
      console.log('\x1b[32m%s\x1b[0m', `Express started: ${process.env.EXPRESS_PUBLIC_SERVER_URL}`);
    });
  } catch (e) {
    console.log(e);
  }
};

start();
