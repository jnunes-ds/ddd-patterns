import CustomerFactory from "@domain/customer/factory/customer.factory";
import Address from "@domain/customer/value-object/address";
import ListCustomerUsecase from "./list.customer.usecase";

const customer1 = CustomerFactory.createWithAddress(
  "John Doe", new Address("street", 123, "city", "state", "zip")
);

const customer2 = CustomerFactory.createWithAddress(
  "Jane Doe", new Address("street w", 1233, "city 2", "state 2", "zip 2")
);

const MockRepository = () => ({
  create: jest.fn(),
  find: jest.fn(),
  findAll: jest.fn().mockReturnValue(Promise.resolve([customer1, customer2])),
  update: jest.fn(),
});

describe('Unit Test - List Customer use Case', () => {
  it('should list customers', async () => {
    const repository = MockRepository();
    const usecase = new ListCustomerUsecase(repository);
    const output = await usecase.execute({});

    expect(output.customers.length).toBe(2);
    expect(output.customers[0].id).toBe(customer1.id);
    expect(output.customers[0].name).toBe(customer1.name);
    expect(output.customers[0].address.street).toBe(customer1.address.street);
    expect(output.customers[1].id).toBe(customer2.id);
    expect(output.customers[1].name).toBe(customer2.name);
    expect(output.customers[1].address.street).toBe(customer2.address.street);
  });
});