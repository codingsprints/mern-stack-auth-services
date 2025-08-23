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

/** self */
export interface SelfDataType {
  id: number;
  userName: string;
  email: string;
  firstName: string;
  lastName: string;
  role: Roles;
  password: string;
  //   tenant: IGetAllTenantsDto | null;
}

export interface SelfDtoType {
  id: number;
  fullName: string;
  userName: string;
  email: string;
  role: string;
  //   tenant: IGetAllTenantsDto | null;
}

export interface SelfResObjectType {
  code: number;
  status: string;
  message: string;
  data: {
    selfDto: SelfDtoType;
  };
  error: boolean;
}

// logout user
export interface LogoutType {
  id: number;
  role: Roles;
}

export interface LogoutDtoType {
  id: number;
  role: Roles;
}

export interface LogoutResObjectType {
  code: number;
  status: string;
  message: string;
  data: {
    logoutDto: LogoutDtoType;
  };
  error: boolean;
}
