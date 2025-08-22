import { DataSource } from 'typeorm';
import app from '../../src/app';
import request from 'supertest';
import { AppDataSourceInitialize } from '../../src/utils/common';
import { Roles } from '../../src/Types';
import { User } from '../../src/database/entities/User';

describe('POST /pizza-app/auth-service/api/v1/auth/register', () => {
  let connection: DataSource;
  const baseUrl = '/pizza-app/auth-service/api/v1/auth/register';

  beforeAll(async () => {
    connection = await AppDataSourceInitialize();
  });

  beforeEach(async () => {
    await connection.dropDatabase();
    await connection.synchronize();
  });

  afterAll(async () => {
    await connection.destroy();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Successful Registration', () => {
    it('should create a new user and return 201 status code', async () => {
      //Arrage
      const mockUser = {
        userName: 'parth731',
        firstName: 'Parth',
        lastName: 'Dangroshiya',
        email: 'BxPnM@example.com',
        password: 'Parth@123',
      };

      //Act
      const response = await request(app).post(baseUrl).send(mockUser);

      //Asserts
      expect(response.statusCode).toBe(201);
      expect(response.body.message).toBe('user created!!');
      expect(response.body.data.registerUserDto).toHaveProperty('id');

      const userRepository = connection.getRepository(User);
      const users = await userRepository.find();
      expect(users).toHaveLength(1);
      expect(users[0]?.firstName).toBe(mockUser.firstName);
      expect(users[0]?.role).toBe(Roles.CUSTOMER);
    });
    it('should store hashed password and persist user in the database', async () => {
      //Arrage
      const mockUser = {
        userName: 'parth731',
        firstName: 'Parth',
        lastName: 'Dangroshiya',
        email: 'BxPnM@example.com',
        password: 'Parth@123',
      };
      await request(app).post(baseUrl).send(mockUser);

      const userRepository = connection.getRepository(User);
      const users = await userRepository.find({ select: ['password'] });
      expect(users[0]?.password).not.toBe(mockUser.password);
      expect(users[0]?.password).toHaveLength(60);
      expect(users[0]?.password).toMatch(/^\$2[a|b]\$\d+\$/);
    });
  });

  describe('Invalid Registration', () => {
    //Arrage
    const mockUser = {
      userName: 'parth731',
      firstName: 'Parth',
      lastName: 'Dangroshiya',
      email: 'BxPnM@example.com',
      password: 'Parth@123',
    };
    const invalidCases = [
      { field: 'userName', data: { ...mockUser, userName: '' } },
      { field: 'email', data: { ...mockUser, email: '' } },
      { field: 'firstName', data: { ...mockUser, firstName: '' } },
      { field: 'lastName', data: { ...mockUser, lastName: '' } },
      { field: 'password', data: { ...mockUser, password: '' } },
    ];

    invalidCases.forEach(({ field, data }) => {
      it(`should return 400 status code if ${field} is missing`, async () => {
        const response = await request(app).post(baseUrl).send(data);
        expect(response.statusCode).toBe(400);

        const userRepository = connection.getRepository(User);
        const users = await userRepository.find();
        expect(users).toHaveLength(0);
      });
    });

    it('should return 400 if email format is invalid', async () => {
      const response = await request(app)
        .post(baseUrl)
        .send({ ...mockUser, email: 'invalidemail' });
      expect(response.statusCode).toBe(400);
    });

    it('should return 400 if password format is invalid', async () => {
      const response = await request(app)
        .post(baseUrl)
        .send({ ...mockUser, password: 'short' });
      expect(response.statusCode).toBe(400);
    });

    it('Duplicate Email - should return 400 if email already exists', async () => {
      const userRepository = connection.getRepository(User);
      await userRepository.save({ ...mockUser, role: Roles.CUSTOMER });

      const response = await request(app).post(baseUrl).send(mockUser);
      expect(response.statusCode).toBe(400);

      const users = await userRepository.find();
      expect(users).toHaveLength(1);
    });

    it('Field Formatting - should trim the email field', async () => {
      await request(app)
        .post(baseUrl)
        .send({ ...mockUser, email: ' BxPnM@example.com ' });

      const userRepository = connection.getRepository(User);
      const user = await userRepository.findOneBy({
        email: 'BxPnM@example.com',
      });
      expect(user).toBeDefined();
    });
  });
});
