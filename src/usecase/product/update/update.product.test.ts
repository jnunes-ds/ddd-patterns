import ProductFactory from "@domain/product/factory/product.factory";
import {InputUpdateProductDTO} from "./update.product.dto";
import UpdateProductUseCase from "./update.product.usecase";
import ProductRepository from "@infra/product/repository/sequelize/product.repository";
import {Sequelize} from "sequelize-typescript";
import ProductModel from "@infra/product/repository/sequelize/product.model";

const product = ProductFactory.create("a", "Bicicleta", 250);

const input: InputUpdateProductDTO = {
  id: product.id,
  name: "Super Bike",
  price: 150,
}

describe("Integration Test - Update Product use Case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    })

    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  test("update product usecase and it's integration with product repository", async () => {
    const productRepository = new ProductRepository();
    const usecase = new UpdateProductUseCase(productRepository);

    await productRepository.create(product);

    const inputWithWrongId: InputUpdateProductDTO = {
      ...input,
      id: "wrongId"
    }

    const output = await usecase.execute(input);

    expect(output).toEqual(input);
    await expect(usecase.execute(inputWithWrongId)).rejects.toThrowError("Product not found");
  });

});