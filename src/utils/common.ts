import createHttpError from 'http-errors';
import { User } from '../database/entities/User';
import { DataSource, Repository } from 'typeorm';
import { AppDataSource } from '../database/data-source-async';

export const AppDataSourceInitialize = async (): Promise<DataSource> => {
  const dataSource = await AppDataSource();
  /* sonarqube-ignore-start */
  if (!dataSource) {
    throw createHttpError(500, 'error is create from AppDataSource');
  }
  /* sonarqube-ignore-end */
  return dataSource.initialize();
};

export const getUserRepository = async (): Promise<Repository<User>> => {
  const dataSource = await AppDataSource();
  /* sonarqube-ignore-start */
  if (!dataSource) {
    throw createHttpError(
      500,
      'DataSource is undefined from getUserRepository',
    );
  }
  /* sonarqube-ignore-end */
  await dataSource.initialize();
  return dataSource.getRepository(User);
};
