import express from 'express';
import { registerUser } from '../controllers/authControllers';
import registerValidators from '../Validator/register-validators';
import { validate } from '../Validator/ValidationChain';

const router = express.Router();

router.post('/register', validate(registerValidators), registerUser);

export default router;
