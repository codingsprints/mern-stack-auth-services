import createHttpError from 'http-errors';
import { AppDataSource } from '../database/data-source-async';
import { DataSource, Repository } from 'typeorm';
import { User } from '../database/entities/User';
import { RefreshToken } from '../database/entities/RefreshToken';
import { Tenant } from '../database/entities/Tenant';
import { Request, Response, NextFunction } from 'express';
import { configENV } from '../config/config';
import { getFileFromS3 } from '../services/s3Service';
import logger from '../config/logger';

export const isLeapYear = (year: number): number => {
  // A leap year satisfies the following conditions
  // sonarqube-ignore-line
  if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
    return 1000 * 60 * 60 * 24 * 364;
  } else {
    return 1000 * 60 * 60 * 24 * 365; // Not a leap year
  }
};

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

export const getRefreshTokenRepository = async (): Promise<
  Repository<RefreshToken>
> => {
  const dataSource = await AppDataSource();
  /* sonarqube-ignore-start */
  if (!dataSource) {
    throw createHttpError(
      500,
      'DataSource is undefined from getRefreshTokenRepository',
    );
  }
  /* sonarqube-ignore-end */
  await dataSource.initialize();
  return dataSource.getRepository(RefreshToken);
};

export const getTenantRepository = async (): Promise<Repository<Tenant>> => {
  const dataSource = await AppDataSource();
  /* sonarqube-ignore-start */
  if (!dataSource) {
    throw createHttpError(
      500,
      'DataSource is undefined from getTenantRepository',
    );
  }
  /* sonarqube-ignore-end */
  await dataSource.initialize();
  return dataSource.getRepository(Tenant);
};

export const handlerWellKnown = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const bucketName = configENV.awsS3BucketName;
    const key = configENV.awsS3JWKS;

    if (!bucketName || !key) {
      throw createHttpError(500, 'S3 bucket name or key not provided');
    }

    const privateKey = await getFileFromS3(bucketName, key);
    logger.info('--- s3 connected successfully!');

    // ✅ parse JSON string into object
    const jwks = JSON.parse(privateKey!);

    res.status(200).json(jwks); // ✅ directly send object
  } catch (err) {
    next(err);
  }
};
