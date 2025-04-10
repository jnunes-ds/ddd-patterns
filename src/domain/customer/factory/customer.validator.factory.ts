import {IValidator} from "@domain/@shared/validator/validator.interface";
import Customer from "@domain/customer/entity/customer";
import CustomerZodValidator from "@domain/customer/validator/customer.zod.validator";

export default class CustomerValidatorFactory {
  static create(): IValidator<Customer> {
    return new CustomerZodValidator();
  }
}