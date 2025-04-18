import CreateCustomerUseCase from "./create.customer.usecase";

const input = {
  name: "John Doe",
  address: {
    street: "street",
    number: 123,
    city: "city",
    state: "state",
    zipCode: "zip",
  },
}

const MockRepository = () => ({
  find: jest.fn(),
  findAll: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
});

describe("Unit Test - Create Customer Use Case", () => {
  it("should create a customer", async () => {
    const customerRepository = MockRepository();
    const usecase = new CreateCustomerUseCase(customerRepository);

    const output = await usecase.execute(input);

    expect(customerRepository.create).toHaveBeenCalled();
    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      address: input.address,
    });
  });

  it("should throw an error when name is missing", async () => {
    const customerRepository = MockRepository();
    const usecase = new CreateCustomerUseCase(customerRepository);

    input.name = "";

    const output = usecase.execute(input);

    await expect(output).rejects.toThrowError("customer: name is required");
  });

  it("should throw an error when street is missing", async () => {
    const customerRepository = MockRepository();
    const usecase = new CreateCustomerUseCase(customerRepository);

    input.address.street = "";

    const output = usecase.execute(input);

    await expect(output).rejects.toThrowError("Street is required");
  });
});