import Customer from "./customer";
import Address from "./address";

describe("Customer unit tests", () => {
  let customer: Customer;

  beforeEach(() => {
    customer = new Customer("123", "John Doe");
    customer.address = new Address("Rua do beco", 123, "Brasília", "DF", "12345-678");

    customer.activate();
  });

  it("Should throw error when id is empty", () => {

    expect(() => {
      new Customer("", "John Doe");
    }).toThrowError("Id is required");
  });

  it("Should throw error when name is empty", () => {

    expect(() => {
      new Customer("123", "");
    }).toThrowError("Name is required");
  });

  it("Should change name", () => {
    // Act
    customer.changeName("Jane Doe");

    // Assert
    expect(customer.name).toBe("Jane Doe");
  });

  it("Should activate customer", () => {

    expect(customer.isActive)
      .toEqual({isActive: true});
  });

  it("Should throw Error when try to activate the customer without inform his address", () => {
    expect(() => {
      const customer = new Customer("123", "John Doe");
      customer.activate();
    }).toThrowError("Address is required");
  });

  it("Should deactivate customer", () => {
    customer.deactivate();

    expect(customer.isActive)
      .toEqual({isActive: false});
  });

  it("should add reward points", () => {
    const customer = new Customer("c1", "Customer 1");
    expect(customer.rewardPoints).toBe(0);

    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(10);

    customer.addRewardPoints(20);
    expect(customer.rewardPoints).toBe(30);
  });
});