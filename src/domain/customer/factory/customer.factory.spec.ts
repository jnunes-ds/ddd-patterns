import CustomerFactory from "@domain/customer/factory/customer.factory";
import Address from "@domain/customer/value-object/address";

describe("Customer Factory unity tests", () => {
  it("Should create a customer", () => {
    const customer = CustomerFactory.create("John Doe");

    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("John Doe");
    expect(customer.address).toBeUndefined();
  });

  it("should create a customer with address", () => {
    const address = new Address("Rua do beco", 123, "Brasília", "DF", "12345-678");
    const customer = CustomerFactory.createWithAddress("John Doe", address);

    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("John Doe");
    expect(customer.address).toMatchObject(address);
  });
});