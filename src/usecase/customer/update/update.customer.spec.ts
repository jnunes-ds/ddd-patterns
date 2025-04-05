import CustomerFactory from "@domain/customer/factory/customer.factory";
import Address from "@domain/customer/value-object/address";
import UpdateCustomerUsecase from "./update.customer.usecase";

const address = new Address('street', 123, 'city', 'state', 'zip');
const customer = CustomerFactory.createWithAddress('John Doe', address);

const input = {
  id: customer.id,
  name: 'John Updated',
  address: {
    street: 'street updated',
    number: 12345,
    city: 'city updated',
    state: 'state updated',
    zipCode: 'zip-updated',
  },
}

const MockRepository = () => ({
  findAll: jest.fn(),
  create: jest.fn(),
  find: jest.fn().mockReturnValue(Promise.resolve(customer)),
  update: jest.fn(),
});

describe('Unit Test - Update Customer use Case', () => {
  it('should update a customer', async () => {
    const customerRepository = MockRepository();
    const usecase = new UpdateCustomerUsecase(customerRepository);

    const output = await usecase.execute(input);

    expect(output).toEqual(input);
  });

});