import { S3Client } from '@aws-sdk/client-s3';
import { configENV } from './config';

export const s3Client = new S3Client({
  region: configENV.awsRegion,
  credentials: {
    accessKeyId: configENV.awsAccessKeyId,
    secretAccessKey: configENV.awsSecretAccessKey,
  },
});
