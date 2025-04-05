import {InputFindProductDTO, OutputFindProductDTO} from "./find.product.dto";
import FindProductUsecase from "./find.product.usecase";
import ProductRepository from "@infra/product/repository/sequelize/product.repository";
import Product from "@domain/product/entity/product";
import {v4 as uuid} from 'uuid';
import {Sequelize} from "sequelize-typescript";
import ProductModel from "@infra/product/repository/sequelize/product.model";


describe("Integration Test - Find product use case", () => {
  let sequelize: Sequelize;
  let product: Product;

  beforeAll(() => {
    product = new Product(uuid(), "Barbeador", 15.5);
  });

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

  test("Find a product use case and it's integration with product repository", async () => {
    const productRepository = new ProductRepository();
    const usecase = new FindProductUsecase(productRepository);

    await productRepository.create(product);

    const input: InputFindProductDTO = {
      id: product.id
    };

    const expecterOutput: OutputFindProductDTO = {
      id: product.id,
      name: product.name,
      price: product.price,
    }

    const output = await usecase.execute(input);
    expect(output).toStrictEqual(expecterOutput);
  });
});