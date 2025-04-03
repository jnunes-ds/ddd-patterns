import Customer from "@domain/customer/entity/customer";
import Address from "@domain/customer/value-object/address";
import FindCustomerUsecase from "./find.customer.usecase";

const customer = new Customer("id123", "John Doe");
const address = new Address("street", 123, "city", "state", "zip");
customer.changeAddress(address);

const MockRepository = () => ({
  find: jest.fn().mockReturnValue(Promise.resolve(customer)),
  findAll: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
});

describe("Unit Test - Find Customer use Case", () => {

  it("should find a customer", async () => {
    const customerRepository = MockRepository();
    const usecase = new FindCustomerUsecase(customerRepository);

    await customerRepository.create(customer);

    const input = {
      id: "id123",
    }

    const expectedOutput = {
      id: "id123",
      name: "John Doe",
      address: {
        street: "street",
        city: "city",
        state: "state",
        number: 123,
        zip: "zip",
      },
    }

    const output = await usecase.execute(input);

    expect(output).toEqual(expectedOutput);
  });

  it("should throw an error when customer is not found", async () => {
    const customerRepository = MockRepository();
    const usecase = new FindCustomerUsecase(customerRepository);

    customerRepository.find.mockImplementation(() => {
      throw new Error("Customer not found");
    })

    const input = {
      id: "id123",
    }


    await expect(usecase.execute(input)).rejects.toThrowError("Customer not found");
  })
});