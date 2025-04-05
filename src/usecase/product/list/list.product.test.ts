import ProductFactory from "@domain/product/factory/product.factory";
import {InputListProductDTO, OutputListProductDTO} from "./list.product.dto";
import ListProductUsecase from "./list.product.usecase";
import ProductRepository from "@infra/product/repository/sequelize/product.repository";
import {Sequelize} from "sequelize-typescript";
import ProductModel from "@infra/product/repository/sequelize/product.model";

const product1 = ProductFactory.create("a", "Bicicleta", 250);
const product2 = ProductFactory.create("a", "Skate", 150);

describe('Integration Test - List Product Use Case', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  test("list all products use case and it's integration with product repository", async () => {
    const productRepository = new ProductRepository();
    const usecase = new ListProductUsecase(productRepository);

    await productRepository.create(product1);
    await productRepository.create(product2);

    const input: InputListProductDTO = {};

    const expectedOutput: OutputListProductDTO = {
      products: [
        {
          id: product1.id,
          name: product1.name,
          price: product1.price,
        },
        {
          id: product2.id,
          name: product2.name,
          price: product2.price,
        },
      ],
    };

    const output = await usecase.execute(input);

    expect(output).toStrictEqual(expectedOutput);
  });
});