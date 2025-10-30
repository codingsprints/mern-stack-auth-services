import 'reflect-metadata';
import cookieParser from 'cookie-parser';
import express, { Request, Response } from 'express';
import cors from 'cors';
import authRouter from './routes/authRouter';
import tenantRouter from './routes/tenantRouter';
import userRouter from './routes/userRouter';
import { globalErrorHandler } from './middlewares/globalErrorHandler';
import { handlerWellKnown } from './utils/common';
import path from 'path';
import { configENV } from './config/config';

const app = express();

app.use(express.static('public'));
app.use(cookieParser());
app.use(express.json());

const ALLOWED_DOMAINS = [configENV.adminUI, configENV.clientUI];

app.use(
  cors({
    origin: ALLOWED_DOMAINS as string[],
    credentials: true,
  }),
);

// Serve static files from .well-known
// console.log('---__dirname---', __dirname);

app.use(
  '/.well-known',
  express.static(path.join(__dirname, '../public/.well-known')),
);

app.use('/well-known', handlerWellKnown);

app.get(`/`, async (req: Request, res: Response) => {
  res.send('Welcome to Auth Service API from Kubernetes!');
});

app.use(`/auth`, authRouter);
app.use(`/tenants`, tenantRouter);
app.use(`/users`, userRouter);

// global error handler
app.use(globalErrorHandler);

export default app;
