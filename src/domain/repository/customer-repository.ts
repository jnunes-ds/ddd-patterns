import RepositoryInterface from "./repository-interface";
import Customer from "@domain/entity/customer";

export default interface CustomerRepositoryInterface
  extends RepositoryInterface<Customer> {}