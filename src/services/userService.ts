import { RegisterDataType, UserData } from '../Types/auth';
import { getUserRepository } from '../utils/common';
import createHttpError from 'http-errors';
import bcrypt from 'bcryptjs';
import { saltRounds } from '../utils/constant';

export const CreateUserService = async ({
  userName,
  firstName,
  lastName,
  email,
  password,
  role,
}: UserData): Promise<RegisterDataType> => {
  const userRepository = await getUserRepository();
  const uniqueUserName = await userRepository.findOne({
    where: { userName: userName },
  });
  if (uniqueUserName) {
    const error = createHttpError(400, 'Username is already exists!');
    throw error;
  }

  //email unique
  const uniqueEmail = await userRepository.findOne({
    where: { email: email },
  });
  if (uniqueEmail) {
    const error = createHttpError(400, 'Email is already exists!');
    throw error;
  }

  //hash password
  const hashPassword = await bcrypt.hash(password, saltRounds);
  try {
    const user = await userRepository.save({
      userName,
      firstName,
      lastName,
      email,
      password: hashPassword,
      role,
    });
    return user;
  } catch (error) {
    if (error instanceof Error) {
      throw createHttpError(500, error.message);
    } else {
      const customError = createHttpError(
        500,
        'failed to store the data in the database',
      );
      throw customError;
    }
  }
};
