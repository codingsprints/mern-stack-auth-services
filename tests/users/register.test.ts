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
  });
});
