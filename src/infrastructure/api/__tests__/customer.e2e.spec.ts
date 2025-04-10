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

    const listResponseXML = await request(app)
      .get("/api/customers")
      .set("Accept", "application/xml")
      .send();

    expect(listResponseXML.status).toBe(200);
    expect(listResponseXML.text).toContain(`<?xml version="1.0" encoding="UTF-8"?>`);
    expect(listResponseXML.text).toContain(`<customers>`);
    expect(listResponseXML.text).toContain(`<customer>`);
    expect(listResponseXML.text).toContain(`<id>${listResponse.body.customers[0].id}</id>`);
    expect(listResponseXML.text).toContain(`<name>${listResponse.body.customers[0].name}</name>`);
    expect(listResponseXML.text).toContain(`<street>${listResponse.body.customers[0].address.street}</street>`);
    expect(listResponseXML.text).toContain(`<number>${listResponse.body.customers[0].address.number}</number>`);
    expect(listResponseXML.text).toContain(`<city>${listResponse.body.customers[0].address.city}</city>`);
    expect(listResponseXML.text).toContain(`<state>${listResponse.body.customers[0].address.state}</state>`);
    expect(listResponseXML.text).toContain(`<zipCode>${listResponse.body.customers[0].address.zipCode}</zipCode>`);
  });
});