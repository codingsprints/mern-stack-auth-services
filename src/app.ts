import express from 'express';
import cookieParser from 'cookie-parser';
import { configENV } from './config/config';
import authRouter from './routes/authRouter';
import { globalErrorHandler } from './middleware/globalErrorHandler';
import path from 'path';

const app = express();
app.use(express.static('public'));
app.use(cookieParser());
app.use(express.json());

console.log('env -->', configENV.port);

// app.use(
//   '/.well-known',
//   express.static(path.join(__dirname, 'public/.well-known')),
// );

app.use(
  '/.well-known',
  express.static(path.join(__dirname, '../public/.well-known')),
);

app.get('/', async (req, res) => {
  console.log('hello');
  res.send('Server is running!');
});

app.use(`${configENV.baseUrl}/auth`, authRouter);

app.use(globalErrorHandler);

export default app;
