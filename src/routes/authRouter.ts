import express, { RequestHandler } from 'express';
import {
  loginUser,
  logout,
  refresh,
  registerUser,
  self,
} from '../controllers/authControllers';
import registerValidators from '../Validator/register-validators';
import { validate } from '../Validator/ValidationChain';
import loginValidators from '../Validator/login-validators';
import validateRefreshToken from '../middleware/validateRefreshToken';
import authenticate from '../middleware/authenticate';
import parseRefreshToken from '../middleware/parseRefreshToken';

const router = express.Router();

router.post('/register', validate(registerValidators), registerUser);
router.post('/login', validate(loginValidators), loginUser);
router.post(
  '/refresh',
  validateRefreshToken,
  refresh as unknown as RequestHandler,
);
router.get('/self', authenticate, self as unknown as RequestHandler);

router.post(
  '/logout',
  authenticate,
  parseRefreshToken,
  logout as unknown as RequestHandler,
);
export default router;
