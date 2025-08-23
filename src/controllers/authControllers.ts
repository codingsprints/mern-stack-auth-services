import { NextFunction, Request, Response } from 'express';
import {
  CreateUserService,
  findByEmailWithPasswordService,
  findByIdService,
} from '../services/userService';
import { AuthRequest, Roles } from '../Types';
import {
  LoginResObjectType,
  LoginUserRequest,
  RefreshTokenResObjectType,
  RegisterDataType,
  RegisterResObjectType,
} from '../Types/auth';
import { loginUserDto, refreshTokenDto, registerUserDto } from '../Dto/userDto';
import { ApiSuccessHandler } from '../utils/ApiSuccess';
import logger from '../config/logger';
import { JwtPayload } from 'jsonwebtoken';
import {
  deleteRefreshToken,
  generateAccessToken,
  generateRefreshToken,
  persistRefreshToken,
} from '../services/tokenService';
import { setResponseCookies } from '../utils/auth';
import { validationResult } from 'express-validator';
import { comparePassword } from '../services/CredentialService';
import createHttpError from 'http-errors';

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    res.status(400).json({ errors: result.array() });
    return;
  }
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

export const loginUser = async (
  req: LoginUserRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    res.status(400).json({ errors: result.array() });
    return;
  }
  const { email, password, userName } = req.body;
  logger.debug('New request to login a user', {
    userName,
    email,
    password: '******',
  });

  try {
    //check if Username is exists
    //check if email is exists
    const existUser = await findByEmailWithPasswordService(email, userName);

    //compare password
    const isPasswordMatch = await comparePassword(
      password,
      existUser?.password,
    );
    if (!isPasswordMatch)
      throw createHttpError(
        400,
        'Username or Email or Password does not match!',
      );

    //generate token
    const payload: JwtPayload = {
      sub: String(existUser?.id),
      role: existUser?.role,
      userName: existUser.userName,
      firstName: existUser.firstName,
      lastName: existUser.lastName,
      email: existUser.email,
    };

    const accessToken = await generateAccessToken(payload);

    //persist refresh token
    const newRefreshToken = await persistRefreshToken(existUser);

    const refreshToken = generateRefreshToken({
      ...payload,
      id: String(newRefreshToken.id),
    });

    setResponseCookies(res, accessToken, refreshToken);

    logger.info('user has been logged in', { id: existUser?.id });

    const resObj = { ...existUser, password: '' };

    const loginResObject: LoginResObjectType = {
      code: 200,
      status: 'success',
      message: 'user logged in successfully!!!',
      data: loginUserDto(resObj),
      error: false,
    };

    ApiSuccessHandler(res, loginResObject);
  } catch (error) {
    next(error);
  }
};

export const refresh = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    /**
    {
      sub: '3',
      role: 'customer',
      id: '7',
      iat: 1734851865,
      exp: 1766409465,
      iss: 'Auth-service',
      jti: '7'
    }
    console.log((req as unknown as AuthRequest).auth);
    */

    //generate token
    const payload: JwtPayload = { sub: req.auth.sub, role: req.auth.role };
    const accessToken = await generateAccessToken(payload);

    const existUserName = await findByIdService(Number(req.auth.sub));
    if (!existUserName) {
      const error = createHttpError(
        '400',
        'User with the token could not field',
      );
      next(error);
      return;
    }

    //new persist refresh token generate
    const newRefreshToken = await persistRefreshToken(existUserName);

    logger.info('generate new refresh token');

    //delete old persist refresh token
    await deleteRefreshToken(Number(req.auth.id));

    logger.info('delete old refresh token', { id: req.auth.id });

    const refreshToken = generateRefreshToken({
      ...payload,
      id: String(newRefreshToken.id),
    });

    setResponseCookies(res, accessToken, refreshToken);

    const refreshTokenResObject: RefreshTokenResObjectType = {
      code: 200,
      status: 'success',
      message: 'refresh token and access token generated successfully',
      data: refreshTokenDto(existUserName),
      error: false,
    };

    ApiSuccessHandler(res, refreshTokenResObject);
  } catch (error) {
    next(error);
  }
};
