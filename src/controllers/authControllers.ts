import { NextFunction, Request, Response } from 'express';
import { CreateUserService } from '../services/userServices';
import { Roles } from '../Types';
import { RegisterDataType, RegisterResObjectType } from '../Types/auth';
import { registerUserDto } from '../Dto/userDto';
import { ApiSuccessHandler } from '../utils/ApiSuccess';

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  console.log(req.body);

  const { firstName, lastName, email, password, userName } = req.body;

  try {
    const user = await CreateUserService({
      userName,
      firstName,
      lastName,
      email,
      password,
      role: Roles.CUSTOMER,
    });

    const resObj: RegisterDataType = { ...user, password: '' };

    const registerResObject: RegisterResObjectType = {
      code: 201,
      status: 'success',
      message: 'user created!!',
      data: registerUserDto(resObj),
      error: false,
    };

    ApiSuccessHandler(res, registerResObject);
  } catch (error) {
    next(error);
  }
};
