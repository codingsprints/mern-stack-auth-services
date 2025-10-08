import {
  GetAllUsersDtoType,
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
  UpdateUserDtoType,
  UpdateUserType,
} from '../Types/auth';

export const registerUserDto = (
  user: RegisterDataType,
): { registerUserDto: RegisterUserDtoType } => {
  return {
    registerUserDto: {
      id: user.id,
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
      email: user.email,
      role: user.role,
      tenant: user.tenant ? String(user.tenant) : null,
    },
  };
};

export const selfUserDto = (user: SelfDataType): { selfDto: SelfDtoType } => {
  return {
    selfDto: {
      id: Number(user?.id),
      fullName: `${user?.firstName} ${user?.lastName}`,
      email: user?.email,
      role: user?.role,
      tenant: user?.tenant,
    },
  };
};

export const refreshTokenDto = (
  user: RefreshTokenType,
): { refreshTokenDto: RefreshTokenDtoType } => {
  return {
    refreshTokenDto: {
      id: user.id,
      email: user.email,
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

export const updateUserDto = (
  user: UpdateUserType,
): {
  updateUserDto: UpdateUserDtoType;
} => {
  return {
    updateUserDto: {
      id: user.id,
      fullName: `${user.firstName} ${user.lastName}`,
      email: user.email,
      role: user.role,
      tenantId: user.tenantId,
    },
  };
};

export const getAllUsersDto = (
  users: GetAllUsersDtoType[],
  currentPage: number,
  perPage: number,
  total: number,
): {
  getAllUsersDto: GetAllUsersDtoType[];
  currentPage: number;
  perPage: number;
  total: number;
} => {
  return {
    getAllUsersDto: users,
    currentPage,
    perPage,
    total,
  };
};

export const getUserByIdDto = (
  user: GetAllUsersDtoType,
): { getUserByIdDto: GetAllUsersDtoType } => {
  return {
    getUserByIdDto: user,
  };
};

export const deleteuserDto = (
  user: GetAllUsersDtoType,
): { deleteuserDto: GetAllUsersDtoType } => {
  return {
    deleteuserDto: user,
  };
};
