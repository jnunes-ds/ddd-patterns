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

  it("should not create a customer with invalid data", async () => {
    const response = await request(app)
      .post("/api/customers")
      .send({
        name: "Jhon Doe",
      });

    expect(response.status).toBe(500);
  });

  it("should list all customers", async () => {
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

    const response2 = await request(app)
      .post('/api/customers')
      .send({
        name: 'Jane Doe',
        address: {
          street: '456 Elm St',
          number: 789,
          city: 'Othertown',
          state: 'NY',
          zipCode: '67890'
        }
      });
    expect(response2.status).toBe(200);

    const listResponse = await request(app).get('/api/customers').send();
    expect(listResponse.status).toBe(200);
    expect(listResponse.body).toEqual({
      customers: [
        {
          id: expect.any(String),
          name: 'John Doe',
          address: {
            street: '123 Main St',
            number: 156,
            city: 'Anytown',
            state: 'CA',
            zipCode: '12345'
          }
        },
        {
          id: expect.any(String),
          name: 'Jane Doe',
          address: {
            street: '456 Elm St',
            number: 789,
            city: 'Othertown',
            state: 'NY',
            zipCode: '67890'
          }
        }
      ]
    });
  });
});