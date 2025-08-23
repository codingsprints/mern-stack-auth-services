import { Roles } from '.';
import { Request } from 'express';

export interface UserData {
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: Roles;
}

export interface UserCreateType extends UserData {
  id: number;
}

export interface RegisterDataType {
  id: number;
  userName: string;
  email: string;
  firstName: string;
  lastName: string;
  role: Roles;
  password: string;
}

export interface RegisterUserDtoType {
  id: number;
  userName: string;
  email: string;
  fullName: string;
  role: Roles;
  tenantId?: number;
}

export interface RegisterResObjectType {
  code: number;
  status: string;
  message: string;
  data: {
    registerUserDto: RegisterUserDtoType;
  };
  error: boolean;
}

/** login */
export interface LoginUserType {
  id: number;
  userName: string;
  email: string;
  firstName: string;
  lastName: string;
  role: Roles;
  password: string;
}

export interface LoginUserRequest extends Request {
  body: LoginUserType;
}

export interface LoginDtoType {
  id: number;
  fullName: string;
  userName: string;
  email: string;
  role: string;
}

export interface LoginResObjectType {
  code: number;
  status: string;
  message: string;
  data: {
    loginUserDto: LoginDtoType;
  };
  error: boolean;
}

// refresh token
export interface RefreshTokenType {
  id: number;
  userName: string;
  email: string;
  firstName: string;
  lastName: string;
  role: Roles;
  password: string;
}

export interface RefreshTokenDtoType {
  id: number;
  userName: string;
}

export interface RefreshTokenResObjectType {
  code: number;
  status: string;
  message: string;
  data: {
    refreshTokenDto: RefreshTokenDtoType;
  };
  error: boolean;
}
