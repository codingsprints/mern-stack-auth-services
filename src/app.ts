import 'reflect-metadata';
import cookieParser from 'cookie-parser';
import express, { Request, Response } from 'express';
import authRouter from './routes/authRouter';
import tenantRouter from './routes/tenantRouter';
import userRouter from './routes/userRouter';
import { globalErrorHandler } from './middlewares/globalErrorHandler';
import { configENV } from './config/config';
import path from 'path';

const app = express();

app.use(express.static('public'));
app.use(cookieParser());
app.use(express.json());

// Serve static files from .well-known
console.log('---__dirname---', __dirname);
app.use(
  '/.well-known',
  express.static(path.join(__dirname, '../public/.well-known')),
);

app.get(`${configENV.baseUrl}/`, async (req: Request, res: Response) => {
  res.send('Welcome to the API!!!');
});

app.use(`${configENV.baseUrl}/auth`, authRouter);
app.use(`${configENV.baseUrl}/tenants`, tenantRouter);
app.use(`${configENV.baseUrl}/users`, userRouter);

// global error handler
app.use(globalErrorHandler);

export default app;
