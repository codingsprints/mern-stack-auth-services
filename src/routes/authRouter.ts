import express, { RequestHandler } from 'express';
import {
  loginUser,
  refresh,
  registerUser,
} from '../controllers/authControllers';
import registerValidators from '../Validator/register-validators';
import { validate } from '../Validator/ValidationChain';
import loginValidators from '../Validator/login-validators';
import validateRefreshToken from '../middleware/validateRefreshToken';

const router = express.Router();

router.post('/register', validate(registerValidators), registerUser);
router.post('/login', validate(loginValidators), loginUser);
router.post(
  '/refresh',
  validateRefreshToken,
  refresh as unknown as RequestHandler,
);

export default router;
