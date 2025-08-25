import * as dotenv from 'dotenv';
import path from 'path';
import { NODE_ENV_VAL } from '../utils/constant';

// const nodeENV: string = NODE_ENV_VAL.DEVELOPMENT;
// const nodeENV: string = NODE_ENV_VAL.TEST;
const nodeENV: string = NODE_ENV_VAL.PRODUCTION;

dotenv.config({
  path: path.resolve(
    __dirname,
    `../../.env.${process.env.NODE_ENV ?? nodeENV}`,
  ),
});

if (process.env.NODE_ENV === 'prod') {
  console.log('-----production env-----');
}

if (process.env.NODE_ENV === 'dev') {
  console.log('-----development env-----');
}

interface Config {
  port: number;
  nodeEnv: string;
  baseUrl: string;
  hostname: string;

  // PostgreSQL config
  isProduction: boolean;
  dbHost: string;
  dbPort: number;
  dbUsername: string;
  dbPassword: string;
  dbDatabase: string;

  // JWT and Refresh token config
  refreshTokenSecret: string;
  jwtSecret: string;
  refreshTokenIssuer: string;
  accessTokenIssuer: string;
  refreshTokenExpiresIn: string;
  accessTokenExpiresIn: string;
  jwksUri: string;
  privatekey: string;

  databaseUrl: string;
  rdsSSL: string;

  //aws
  awsRegion: string;
  awsAccessKeyId: string;
  awsSecretAccessKey: string;
  awsS3BucketName: string;
  awsS3RdsSSL: string;
  awsS3URI: string;
}

export const configENV: Config = {
  port: parseInt(process.env.PORT ?? '5001', 10),
  nodeEnv: process.env.NODE_ENV || 'dev',
  baseUrl: process.env.BASE_URL ?? '/pizza-app/auth-service/api/v1',
  hostname: process.env.HOSTNAME ?? 'localhost',

  // PostgreSQL config
  isProduction: process.env.NODE_ENV === 'prod',
  dbHost: process.env.DB_HOST ?? 'localhost',
  dbPort: parseInt(process.env.DB_PORT ?? '5432', 10),
  dbUsername: process.env.DB_USERNAME ?? 'root',
  dbPassword: process.env.DB_PASSWORD ?? 'root',
  dbDatabase: process.env.DB_DATABASE ?? 'postgres',

  // JWT and Refresh token config
  refreshTokenSecret:
    process.env.REFRESH_TOKEN_SECRET ??
    'ndalndlandnlanldnalndanalndansdnandkbskabkb',
  jwtSecret: process.env.JWT_SECRET ?? 'damdlamslmdlasmlmsalmdlmaslmdlasm',
  refreshTokenIssuer: process.env.REFRESH_TOKEN_ISSUER ?? 'Auth-service',
  accessTokenIssuer: process.env.ACCESS_TOKEN_ISSUER ?? 'Auth-service',
  refreshTokenExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN ?? '1y',
  accessTokenExpiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN ?? '1h',
  jwksUri:
    process.env.JWKS_URI ?? 'http://localhost:5001/.well-known/jwks.json',

  // others
  privatekey: process.env.PRIVATE_KEY ?? '',
  databaseUrl: process.env.DB_DATABASE_URL ?? '',
  rdsSSL: process.env.RDS_SSL ?? '',

  //aws
  awsRegion: process.env.AWS_REGION!,
  awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID!,
  awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  awsS3BucketName: process.env.AWS_S3_BUCKET_NAME!,
  awsS3RdsSSL: process.env.AWS_RDS_SSL! ?? '',
  awsS3URI: process.env.AWS_S3_URI!,
};
