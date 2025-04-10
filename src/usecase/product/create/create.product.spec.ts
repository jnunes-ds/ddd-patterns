import {InputCreateProductDTO} from "./create.product.dto";
import CreateProductUsecase from "./create.product.usecase";

const input: InputCreateProductDTO = {
  name: "Batata frita",
  price: 10,
};

const MockRepository = () => ({
  find: jest.fn(),
  findAll: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
});

describe("Unit Test - Create Product Use Case", () => {
  it("should create a product", async () => {
    const productRepository = MockRepository();
    const usecase = new CreateProductUsecase(productRepository);

    const output = await usecase.execute(input);

    expect(productRepository.create).toHaveBeenCalled();
    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      price: input.price,
    });
  });

  it("should throw an error when name is missing", async () => {
    const productRepository = MockRepository();
    const usecase = new CreateProductUsecase(productRepository);

    const inputWithoutName: InputCreateProductDTO = {
      ...input,
      name: "",
    }

    const output = usecase.execute(inputWithoutName);

    await expect(output).rejects.toThrowError("Name is required");
  });

  it("should throw an error when price is missing", async () => {
    const productRepository = MockRepository();
    const usecase = new CreateProductUsecase(productRepository);

    const inputWithoutPrice: InputCreateProductDTO = {
      ...input,
      price: 0,
    }

    const output = usecase.execute(inputWithoutPrice);

    await expect(output).rejects.toThrowError("product: Price must be greater than 0");
  });
});