import ICustomerRepository from "@domain/customer/repository/customer-repository.interface";
import {InputCreateCustomerDTO, OutputCreateCustomerDTO} from "./create.customer.dto";
import CustomerFactory from "@domain/customer/factory/customer.factory";
import Address from "@domain/customer/value-object/address";

export default class CreateCustomerUseCase {
  constructor(
    private customerRepository: ICustomerRepository
  ) {}

  async execute(input: InputCreateCustomerDTO): Promise<OutputCreateCustomerDTO> {
    const address = new Address(
      input.address.street,
      input.address.number,
      input.address.city,
      input.address.state,
      input.address.zipCode
    );

    const customer = CustomerFactory.createWithAddress(input.name, address);

    await this.customerRepository.create(customer);

    return {
      id: customer.id,
      name: customer.name,
      address: {
        street: customer.address.street,
        number: customer.address.number,
        city: customer.address.city,
        state: customer.address.state,
        zipCode: customer.address.zipCode,
      },
    }
  }
}