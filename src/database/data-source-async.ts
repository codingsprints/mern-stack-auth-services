import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { configENV } from '../config/config';
import createHttpError from 'http-errors';
import logger from '../config/logger';

export const AppDataSource = async (): Promise<DataSource | undefined> => {
  logger.info('database app datasource calling');
  try {
    // Create the DataSource instance
    const dataSource = new DataSource({
      type: 'postgres',
      host: configENV.dbHost,
      port: Number(configENV.dbPort),
      username: configENV.dbUsername,
      password: configENV.dbPassword,
      database: configENV.dbDatabase,
      synchronize: true, // 👈 here In production false
      logging: false,
      entities: ['src/database/entities/*.{ts,js}'],
      migrations: ['src/database/migrations/*.{ts,js}'],
      ssl: false,
    });

    return dataSource;
  } catch (error) {
    if (error instanceof Error) {
      logger.error('Error setting up data source:', error.message);
    } else {
      throw createHttpError(500, 'Error setting up data source');
    }
  }
};
