import ICustomerRepository from "@domain/customer/repository/customer-repository.interface";
import {InputUpdateCustomerDTO, OutputUpdateCustomerDTO} from "./update.customer.dto";
import Address from "@domain/customer/value-object/address";

export default class UpdateCustomerUsecase {
  constructor(private customerRepository: ICustomerRepository) {}

  async execute(input: InputUpdateCustomerDTO): Promise<OutputUpdateCustomerDTO> {
    const customer = await this.customerRepository.find(input.id);
    customer.changeName(input.name);
    const newAddress = new Address(
      input.address.street,
      input.address.number,
      input.address.city,
      input.address.state,
      input.address.zipCode,
    );

    customer.changeAddress(newAddress);
    await this.customerRepository.update(customer);

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
    };
  }
}