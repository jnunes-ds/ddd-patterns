import Customer from "@domain/customer/entity/customer";
import { v4 as uuid } from "uuid";
import Address from "@domain/customer/value-object/address";

export default class CustomerFactory {
  public static create(name: string) {
    return new Customer(uuid(), name);
  }

  public static createWithAddress(name: string, address: Address) {
    const customer = new Customer(uuid(), name);
    customer.changeAddress(address);
    return customer;
  }
}