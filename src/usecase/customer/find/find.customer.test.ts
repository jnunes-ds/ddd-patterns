import {Sequelize} from "sequelize-typescript";
import CustomerModel from "@infra/customer/repository/sequelize/customer.model";
import CustomerRepository from "@infra/customer/repository/sequelize/customer.repository";
import Customer from "@domain/customer/entity/customer";
import Address from "@domain/customer/value-object/address";
import FindCustomerUsecase from "./find.customer.usecase";

describe("Find Customer use Case", () => {
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

  test("if it find a customer", async () => {
    const customerRepository = new CustomerRepository();
    const usecase = new FindCustomerUsecase(customerRepository);

    const customer = new Customer("id123", "John Doe");
    const address = new Address("street", 123, "city", "state", "zip");
    customer.changeAddress(address);

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
});