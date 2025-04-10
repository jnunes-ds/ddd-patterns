import {InputCreateProductDTO} from "./create.product.dto";
import CreateProductUsecase from "./create.product.usecase";
import {Sequelize} from "sequelize-typescript";
import ProductModel from "@infra/product/repository/sequelize/product.model";
import ProductRepository from "@infra/product/repository/sequelize/product.repository";

const input: InputCreateProductDTO = {
  name: "Batata frita",
  price: 10,
};


describe("Integration Test - Create Product Use Case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });


  test("create a product usecase and it's integration with product repository", async () => {
    const productRepository = new ProductRepository();
    const usecase = new CreateProductUsecase(productRepository);

    const output = await usecase.execute(input);

    const iputWithoutName = {
      ...input,
      name: "",
    }

    const inputWithoutPrice = {
      ...input,
      price: 0,
    }

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      price: input.price,
    });
    await expect(usecase.execute(iputWithoutName)).rejects.toThrowError("product: name is required");
    await expect(usecase.execute(inputWithoutPrice)).rejects.toThrowError("product: price must be greater than 0");
  });
});