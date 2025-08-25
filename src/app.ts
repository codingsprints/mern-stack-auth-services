import 'reflect-metadata';
import cookieParser from 'cookie-parser';
import express, { Request, Response } from 'express';
import authRouter from './routes/authRouter';
import tenantRouter from './routes/tenantRouter';
import userRouter from './routes/userRouter';
import { globalErrorHandler } from './middlewares/globalErrorHandler';
import { configENV } from './config/config';
import { getFileFromS3 } from './services/s3Service';
import createHttpError from 'http-errors';
import logger from './config/logger';

const app = express();

app.use(express.static('public'));
app.use(cookieParser());
app.use(express.json());

// Serve static files from .well-known
console.log('---__dirname---', __dirname);
app.use('/well-known', async (req, res, next) => {
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
});

app.get(`${configENV.baseUrl}/`, async (req: Request, res: Response) => {
  res.send('Welcome to the API!!!');
});

app.use(`${configENV.baseUrl}/auth`, authRouter);
app.use(`${configENV.baseUrl}/tenants`, tenantRouter);
app.use(`${configENV.baseUrl}/users`, userRouter);

// global error handler
app.use(globalErrorHandler);

export default app;
