import { Sequelize } from "sequelize-typescript";
import CustomerRepository from "./customer.repository";
import CustomerModel from "@infra/customer/repository/sequelize/customer.model";
import Customer from "@domain/customer/entity/customer";
import Address from "@domain/customer/value-object/address";

describe("Customer repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([CustomerModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a customer", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("id123", "Customer 1");
    const address = new Address("Street 1", 1, "City 1", "State 1", "Zipcode 1");
    customer.changeAddress(address);
    customer.activate();
    await customerRepository.create(customer);

    const customerModel = await CustomerModel.findOne({ where: { id: "id123" } });

    expect(customerModel.toJSON()).toStrictEqual({
      id: "id123",
      name: customer.name,
      active: customer.isActive.isActive,
      rewardPoints: customer.rewardPoints,
      street: address.street,
      number: address.number,
      state: address.state,
      zipCode: address.zipCode,
      city: address.city,
    });
  });

  it("should update a customer", async () => {
    const customerId = "id123";
    const customerRepository = new CustomerRepository();
    const customer = new Customer(customerId, "Customer 1");
    const address = new Address("Street 1", 1, "City 1", "State 1", "Zipcode 1");
    customer.changeAddress(address);
    customer.activate();
    await customerRepository.create(customer);

    customer.changeName("Customer 2");
    await customerRepository.update(customer);
    const customerModel = await CustomerModel.findOne({ where: { id: customerId } });

    expect(customerModel.toJSON()).toStrictEqual({
      id: customerId,
      name: customer.name,
      active: customer.isActive.isActive,
      rewardPoints: customer.rewardPoints,
      street: address.street,
      number: address.number,
      state: address.state,
      zipCode: address.zipCode,
      city: address.city,
    });
  });

  it("should find a customer", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 1, "City 1", "State 1", "Zipcode 1");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const customerResult = await customerRepository.find(customer.id);

    expect(customer).toStrictEqual(customerResult);
  });

  it("should throw an error when customer is not found", async () => {
    const customerRepository = new CustomerRepository();

    await expect(async () => {
      await customerRepository.find("456ABC");
    }).rejects.toThrow("Customer not found");
  });

  it("should find all customers", async () => {
    const customerRepository = new CustomerRepository();
    const customer1 = new Customer("id123", "Customer 1");
    const address1 = new Address("Street 1", 1, "City 1", "State 1", "Zipcode 1");
    customer1.changeAddress(address1);
    customer1.addRewardPoints(10);
    customer1.activate();

    const customer2 = new Customer("id456", "Customer 2");
    const address2 = new Address("Street 2", 2, "City 2", "State 2", "Zipcode 2");
    customer2.changeAddress(address2);
    customer2.addRewardPoints(20);

    await customerRepository.create(customer1);
    await customerRepository.create(customer2);

    const customers = await customerRepository.findAll();

    expect(customers).toHaveLength(2);
    expect(customers).toContainEqual(customer1);
    expect(customers).toContainEqual(customer2);
  });
});
