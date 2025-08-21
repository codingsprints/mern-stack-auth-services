import { RegisterDataType, RegisterUserDtoType } from '../Types/auth';

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
