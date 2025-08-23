import { Response } from 'express';
import {
  LoginResObjectType,
  LogoutResObjectType,
  RefreshTokenResObjectType,
  RegisterResObjectType,
  SelfResObjectType,
} from '../Types/auth';

export const ApiSuccessHandler = (
  res: Response,
  responseObject:
    | RegisterResObjectType
    | LoginResObjectType
    | RefreshTokenResObjectType
    | SelfResObjectType
    | LogoutResObjectType,
): void => {
  res.status(responseObject.code).json({
    status: responseObject.code,
    type: responseObject.status,
    message: responseObject.message,
    data: responseObject.data,
    error: responseObject.error,
  });
};
