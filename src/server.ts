/* eslint-disable no-unused-vars */
import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import config from './app/config';
import logger from './app/utils/logger';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
let server: Server;

async function main() {
  try {
    await mongoose.connect(config.db_url as string);

    server = app.listen(config.port, () => {
      logger.info(`Server running on port ${config.port}`);
    });
  } catch (error) {
    logger.error('Error connecting to database', error);
  }
}

main();
