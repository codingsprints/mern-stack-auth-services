import {
  LoginDtoType,
  LoginUserType,
  LogoutDtoType,
  LogoutType,
  RefreshTokenDtoType,
  RefreshTokenType,
  RegisterDataType,
  RegisterUserDtoType,
  SelfDataType,
  SelfDtoType,
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

export const selfUserDto = (user: SelfDataType): { selfDto: SelfDtoType } => {
  return {
    selfDto: {
      id: Number(user?.id),
      fullName: `${user?.firstName} ${user?.lastName}`,
      userName: user?.userName,
      email: user?.email,
      role: user?.role,
      //   tenant: user?.tenant,
    },
  };
};

export const logoutDto = (user: LogoutType): { logoutDto: LogoutDtoType } => {
  return {
    logoutDto: {
      id: Number(user.id),
      role: user.role,
    },
  };
};
