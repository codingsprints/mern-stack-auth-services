import dotenv from 'dotenv';
import path from 'path';

const nodeENV: string = 'dev';

dotenv.config({
  path: path.resolve(
    __dirname,
    `../../.env.${process.env.NODE_ENV ?? nodeENV}`,
  ),
});

// console.log('---dev-----', process.env.BASE_URL);

interface Config {
  port: number;
  nodeEnv: string;
  baseUrl: string;

  // PostgreSQL config
  isProduction: boolean;
  dbHost: string;
  dbPort: number;
  dbUsername: string;
  dbPassword: string;
  dbDatabase: string;
}

export const configENV: Config = {
  port: parseInt(process.env.PORT || '5002', 10),
  nodeEnv: nodeENV,
  isProduction: process.env.NODE_ENV === 'prod',
  dbHost: process.env.DB_HOST ?? 'localhost',
  dbPort: parseInt(process.env.DB_PORT ?? '5432', 10),
  dbUsername: process.env.DB_USERNAME ?? 'root',
  dbPassword: process.env.DB_PASSWORD ?? 'root',
  dbDatabase: process.env.DB_DATABASE ?? 'postgres',
  baseUrl: process.env.BASE_URL ?? '/pizza-app/auth-service/api/v1',
};
