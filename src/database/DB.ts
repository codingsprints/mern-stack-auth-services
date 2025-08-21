import createHttpError from 'http-errors';
// import { AppDataSource } from './data-source';
import { AppDataSourceInitialize } from '../utils/common';
import logger from '../config/logger';

export const startApp = async (): Promise<void> => {
  try {
    // AppDataSource.initialize();
    await AppDataSourceInitialize();
    logger.info('✅ Database connected successfully!');
  } catch (error) {
    logger.error(`❌ Database connection failed: ${error}`);
    throw createHttpError(500, '❌ Database connection failed');
  }
};
