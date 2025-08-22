import { NextFunction, Request, Response } from 'express';
import { CreateUserService } from '../services/userService';
import { Roles } from '../Types';
import { RegisterDataType, RegisterResObjectType } from '../Types/auth';
import { registerUserDto } from '../Dto/userDto';
import { ApiSuccessHandler } from '../utils/ApiSuccess';
import logger from '../config/logger';
import { JwtPayload } from 'jsonwebtoken';
import {
  generateAccessToken,
  generateRefreshToken,
  persistRefreshToken,
} from '../services/tokenService';
import { setResponseCookies } from '../utils/auth';

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const { firstName, lastName, email, password, userName } = req.body;

  logger.debug('New request to register a user', {
    userName,
    firstName,
    lastName,
    email,
    password: '******',
  });

  logger.info('register function calling');

  try {
    const user = await CreateUserService({
      userName,
      firstName,
      lastName,
      email,
      password,
      role: Roles.CUSTOMER,
    });
    logger.info('User has been registered', { id: user.id });

    //jwt functionality start
    const payload: JwtPayload = {
      sub: String(user?.id),
      role: user.role,
      userName: user.userName,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };

    const accessToken = await generateAccessToken(payload);

    //persist refresh token
    const newRefreshToken = await persistRefreshToken(user);

    const refreshToken = generateRefreshToken({
      ...payload,
      id: String(newRefreshToken.id),
    });

    setResponseCookies(res, accessToken, refreshToken);
    //jwt functionality end

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
