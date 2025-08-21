import createHttpError from 'http-errors';
// import { AppDataSource } from './data-source';
import { AppDataSourceInitialize } from '../utils/common';

export const startApp = async (): Promise<void> => {
  try {
    // AppDataSource.initialize();
    await AppDataSourceInitialize();
    console.log('✅ Database connected successfully!');
  } catch (error) {
    console.log(`❌ Database connection failed: ${error}`);
    throw createHttpError(500, '❌ Database connection failed');
  }
};
