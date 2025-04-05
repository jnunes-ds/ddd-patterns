import ProductFactory from "@domain/product/factory/product.factory";
import {InputFindProductDTO, OutputFindProductDTO} from "./find.product.dto";
import FindProductUsecase from "./find.product.usecase";

const product = ProductFactory.create("a", "Barbeador", 15.5);

const MockRepository = () => ({
  create: jest.fn(),
  find: jest.fn().mockReturnValue(Promise.resolve(product)),
  findAll: jest.fn(),
  update: jest.fn(),
});

describe("Unit Test - Find product use case", () => {
  it("should find a product", async () => {
    const productRepository = MockRepository();
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