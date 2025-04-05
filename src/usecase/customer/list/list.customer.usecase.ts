import ICustomerRepository from "@domain/customer/repository/customer-repository.interface";
import {InputListCustomerDTO, OutputListCustomerDTO} from "./list.customer.dto";
import Customer from "@domain/customer/entity/customer";

export default class ListCustomerUsecase {
  constructor(private customerRepository: ICustomerRepository) {}

  async execute(_: InputListCustomerDTO): Promise<OutputListCustomerDTO> {
    const customers = await this.customerRepository.findAll();

    return OutputMapper.toOutput(customers);
  }
}

class OutputMapper {
  static toOutput(customer: Customer[]): OutputListCustomerDTO {
    return {
      customers: customer.map((customer) => ({
        id: customer.id,
        name: customer.name,
        address: {
          street: customer.address.street,
          number: customer.address.number,
          city: customer.address.city,
          state: customer.address.state,
          zipCode: customer.address.zipCode
        },
      })),
    }
  }
}
