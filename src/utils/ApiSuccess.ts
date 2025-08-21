import { Response } from 'express';
import { RegisterResObjectType } from '../Types/auth';

export const ApiSuccessHandler = (
  res: Response,
  responseObject: RegisterResObjectType,
): void => {
  res.status(responseObject.code).json({
    status: responseObject.code,
    type: responseObject.status,
    message: responseObject.message,
    data: responseObject.data,
    error: responseObject.error,
  });
};
