import {
  LoginDtoType,
  LoginUserType,
  RefreshTokenDtoType,
  RefreshTokenType,
  RegisterDataType,
  RegisterUserDtoType,
} from '../Types/auth';

export const registerUserDto = (
  user: RegisterDataType,
): { registerUserDto: RegisterUserDtoType } => {
  return {
    registerUserDto: {
      id: user.id,
      userName: user.userName,
      fullName: `${user.firstName} ${user.lastName}`,
      email: user.email,
      role: user.role,
    },
  };
};

export const loginUserDto = (
  user: LoginUserType,
): { loginUserDto: LoginDtoType } => {
  return {
    loginUserDto: {
      id: user.id,
      fullName: `${user.firstName} ${user.lastName}`,
      userName: user.userName,
      email: user.email,
      role: user.role,
    },
  };
};

export const refreshTokenDto = (
  user: RefreshTokenType,
): { refreshTokenDto: RefreshTokenDtoType } => {
  return {
    refreshTokenDto: {
      id: user.id,
      userName: user.userName,
    },
  };
};
