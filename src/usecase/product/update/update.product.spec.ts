import ProductFactory from "@domain/product/factory/product.factory";
import {InputUpdateProductDTO} from "./update.product.dto";
import UpdateProductUseCase from "./update.product.usecase";

const product = ProductFactory.create("a", "Bicicleta", 250);

const input: InputUpdateProductDTO = {
  id: product.id,
  name: "Super Bike",
  price: 150,
}

const MockRepository = () => ({
  find: jest.fn().mockReturnValue(Promise.resolve(product)),
  findAll: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
});

describe("Unit Test - Update Product use Case", () => {
  it("should update a product", async () => {
    const productRepository = MockRepository();
    const usecase = new UpdateProductUseCase(productRepository);

    const output = await usecase.execute(input);

    expect(output).toEqual(input);
  });

  it("should throw an error when product is not found", async () => {
    const productRepository = MockRepository();
    const usecase = new UpdateProductUseCase(productRepository);

    productRepository.find.mockImplementation(() => {
      throw new Error("Product not found");
    })

    await expect(usecase.execute(input)).rejects.toThrowError("Product not found");
  });
});