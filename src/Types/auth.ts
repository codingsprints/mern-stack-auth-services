import { Roles } from '.';

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

export interface UserCreateType extends UserData {
  id: number;
}
