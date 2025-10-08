import createHttpError from 'http-errors';
import { User } from '../database/entities/User';
import bcrypt from 'bcryptjs';
import { allowedUserSortFields, saltRounds } from '../utils/constant';
import {
  LimitedUserData,
  RegisterDataType,
  UserData,
  UserQueryParams,
} from '../Types/auth';
import { Brackets } from 'typeorm';
import { getUserRepository } from '../utils/common';

export const CreateUserService = async ({
  firstName,
  lastName,
  email,
  password,
  tenantId,
  role,
}: UserData): Promise<RegisterDataType> => {
  // sonarqube-ignore-line
  // const userRepository = AppDataSource.getRepository(User);
  const userRepository = await getUserRepository();

  // email unique
  const uniqueUser = await userRepository.findOne({
    where: { email: email },
  });
  if (uniqueUser) {
    const error = createHttpError(400, 'email is already exists!');
    throw error;
  }

  //email unique
  const uniqueEmail = await userRepository.findOne({ where: { email: email } });
  if (uniqueEmail) {
    const error = createHttpError(400, 'Email is already exists!');
    throw error;
  }

  //hash password
  const hashPassword = await bcrypt.hash(password, saltRounds);
  try {
    const user = await userRepository.save({
      firstName,
      lastName,
      email,
      password: hashPassword,
      role,
      tenant: tenantId ? { id: tenantId } : null,
    });
    return user;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    const customError = createHttpError(
      500,
      'failed to store the data in the database',
    );
    throw customError;
  }
};

export const findByEmailWithPasswordService = async (
  email: string,
): Promise<User> => {
  // sonarqube-ignore-line
  // const userRepository = AppDataSource.getRepository(User);
  const userRepository = await getUserRepository();
  const user = await userRepository.findOne({
    where: { email: email },
    select: ['id', 'firstName', 'lastName', 'email', 'role', 'password'],
    relations: { tenant: true },
  });
  if (!user) {
    const error = createHttpError(404, 'user does not exist!');
    throw error;
  }
  return user;
};

export const findByIdService = async (id: number): Promise<User | null> => {
  // sonarqube-ignore-line
  // const userRepository = AppDataSource.getRepository(User);
  const userRepository = await getUserRepository();

  const user = await userRepository
    .createQueryBuilder('user')
    .leftJoinAndSelect('user.tenant', 'tenant') // Include tenant relation
    .where('user.id = :id', { id }) // Match by user id
    .getOne();

  // const user = await userRepository.findOne({ where: { id } });

  return user;
};

export const updateUserService = async (
  userId: number,
  { firstName, lastName, role, email, tenantId }: LimitedUserData,
): Promise<void> => {
  try {
    // sonarqube-ignore-line
    // const userRepository = AppDataSource.getRepository(User);
    const userRepository = await getUserRepository();
    await userRepository.update(userId, {
      firstName,
      lastName,
      role,
      email,
      tenant: tenantId ? { id: tenantId } : null,
    });
  } catch (error) {
    if (error instanceof Error) {
      throw createHttpError(500, error.message);
    } else {
      throw createHttpError(
        500,
        'failed to update the user data in the database',
      );
    }
  }
};

export const getAllUsersService = async (
  validatedQuery: UserQueryParams,
): Promise<{ users: User[]; count: number }> => {
  try {
    const userRepository = await getUserRepository();
    const queryBuilder = userRepository.createQueryBuilder('user');

    // 🔎 Search filter
    if (validatedQuery.q) {
      const searchTerm = `%${validatedQuery.q}%`;
      queryBuilder.where(
        new Brackets((qb) => {
          qb.where("CONCAT(user.firstName, ' ', user.lastName) ILike :q", {
            q: searchTerm,
          }).orWhere('user.email ILike :q', { q: searchTerm });
        }),
      );
    }

    // 🎭 Role filter
    if (validatedQuery.role) {
      queryBuilder.andWhere('user.role = :role', {
        role: validatedQuery.role,
      });
    }

    // 📖 Pagination
    queryBuilder
      .leftJoinAndSelect('user.tenant', 'tenant') //left join
      .skip((validatedQuery.currentPage - 1) * validatedQuery.perPage)
      .take(validatedQuery.perPage);

    // 🔄 Sorting
    const sortBy =
      allowedUserSortFields.includes(
        validatedQuery?.sortBy ? validatedQuery?.sortBy : '',
      ) || 'user.id'; // default column
    const sortOrder =
      validatedQuery.sortOrder?.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';

    queryBuilder.orderBy(String(sortBy), sortOrder as 'ASC' | 'DESC');

    const [users, count] = await queryBuilder.getManyAndCount();

    return { users, count };
  } catch (error) {
    if (error instanceof Error) {
      throw createHttpError(500, error.message);
    } else {
      throw createHttpError(500, 'failed to fetch the data from the database');
    }
  }
};

export const deleteByIdService = async (userId: number): Promise<void> => {
  try {
    // sonarqube-ignore-line
    // await AppDataSource.getRepository(User).delete(userId);
    const userRepository = await getUserRepository();
    await userRepository.delete(userId);
  } catch (error) {
    if (error instanceof Error) {
      throw createHttpError(500, error.message);
    } else {
      throw createHttpError(
        500,
        'failed to single fetch the data from the database',
      );
    }
  }
};
