import RepositoryInterface from "../../@shared/repository/repository-interface";
import Customer from "@domain/customer/entity/customer";

export default interface ICustomerRepository
  extends RepositoryInterface<Customer> {}