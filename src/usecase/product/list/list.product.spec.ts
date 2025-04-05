import ProductFactory from "@domain/product/factory/product.factory";
import {InputListProductDTO, OutputListProductDTO} from "./list.product.dto";
import ListProductUsecase from "./list.product.usecase";

const product1 = ProductFactory.create("a", "Bicicleta", 250);
const product2 = ProductFactory.create("a", "Skate", 150);

const MockRepository = () => ({
  create: jest.fn(),
  find: jest.fn(),
  findAll: jest.fn().mockReturnValue(Promise.resolve([product1, product2])),
  update: jest.fn(),
});


describe('Unit Test - List Product Use Case', () => {
  it('Should list all products', async () => {
    const productRepository = MockRepository();
    const usecase = new ListProductUsecase(productRepository);

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