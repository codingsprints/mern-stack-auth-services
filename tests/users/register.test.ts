import app from '../../src/app';
import request from 'supertest';

describe('POST /pizza-app/auth-service/api/v1/auth/register', () => {
  const baseUrl = '/pizza-app/auth-service/api/v1/auth/register';

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
    });

    it('should return the 201 status code', async () => {
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
      expect(response.headers['content-type']).toEqual(
        expect.stringContaining('json'),
      );
    });
  });
});
