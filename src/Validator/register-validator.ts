import { checkSchema } from 'express-validator';
import {
  emailValidator,
  nameValidator,
  passwordValidator,
} from './common-validators';

export default checkSchema({
  // ...userNameValidator,
  ...nameValidator('firstName'),
  ...nameValidator('lastName'),
  ...emailValidator,
  ...passwordValidator,
});
