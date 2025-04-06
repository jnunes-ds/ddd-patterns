import {app, sequelize} from '../express';
import request from "supertest";

describe('E2E Test - Customer', () => {
  beforeEach(async () => {
    await sequelize.sync({force: true});
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it('should create a customer', async () => {
    const response = await request(app)
      .post('/api/customers')
      .send({
        name: 'John Doe',
        address: {
          street: '123 Main St',
          number: 156,
          city: 'Anytown',
          state: 'CA',
          zipCode: '12345'
        }
      });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: expect.any(String),
      name: 'John Doe',
      address: {
        street: '123 Main St',
        number: 156,
        city: 'Anytown',
        state: 'CA',
        zipCode: '12345'
      }
    });
  });
});