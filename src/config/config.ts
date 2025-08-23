import dotenv from 'dotenv';
import path from 'path';

const nodeENV: string = 'dev';
// const nodeENV: string = 'test';
// const nodeENV: string = 'prod';

console.log('------nodeenv----', process.env.NODE_ENV);

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

  // JWT and Refresh token config
  refreshTokenSecret: string;
  jwtSecret: string;
  refreshTokenIssuer: string;
  accessTokenIssuer: string;
  refreshTokenExpiresIn: string;
  accessTokenExpiresIn: string;
  jwksUri: string;

  //other
  privatekey: string;

  //aws
  awsRegion: string;
  awsAccessKeyId: string;
  awsSecretAccessKey: string;
  awsS3BucketName: string;
  // awsS3RdsSSL: string;
  awsS3URI: string;
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

  // JWT and Refresh token config
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET ?? 'refreshTokenSecret',
  jwtSecret: process.env.JWT_SECRET ?? 'jwtSecret',
  refreshTokenIssuer: process.env.REFRESH_TOKEN_ISSUER ?? 'Auth-service',
  accessTokenIssuer: process.env.ACCESS_TOKEN_ISSUER ?? 'Auth-service',
  refreshTokenExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN ?? '1y',
  accessTokenExpiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN ?? '1h',
  jwksUri:
    process.env.JWKS_URI ?? 'http://localhost:5501/.well-known/jwks.json',

  // others
  privatekey: process.env.PRIVATE_KEY ?? '',

  // aws configation
  awsRegion: process.env.AWS_REGION!,
  awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID!,
  awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  awsS3BucketName: process.env.AWS_S3_BUCKET_NAME!,
  awsS3URI: process.env.AWS_S3_URI!,
};
