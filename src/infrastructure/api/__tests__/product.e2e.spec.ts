import {app, sequelize} from '../express';
import request from "supertest";

describe("E2E Tests for Product API", () => {
  beforeEach(async () => {
    await sequelize.sync({force: true});
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const response = await request(app)
      .post("/api/products")
      .send({
        name: "Product A",
        price: 100,
      });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: expect.any(String),
      name: "Product A",
      price: 100,
    });
  });

  it("should not create a product with invalid data", async () => {
    const response = await request(app)
      .post("/api/products")
      .send({
        name: "Product B",
      });

    expect(response.status).toBe(500);
  });

  it("should list all products", async () => {
    const response = await request(app)
      .post("/api/products")
      .send({
        name: "Product A",
        price: 100,
      });
    expect(response.status).toBe(200);

    const response2 = await request(app)
      .post("/api/products")
      .send({
        name: "Product B",
        price: 200,
      });
    expect(response2.status).toBe(200);

    const listResponse = await request(app).get("/api/products");

    expect(listResponse.status).toBe(200);
    expect(listResponse.body).toEqual({
      products: [
        {
          id: expect.any(String),
          name: "Product A",
          price: 100,
        },
        {
          id: expect.any(String),
          name: "Product B",
          price: 200,
        },
      ],
    });


  });
});