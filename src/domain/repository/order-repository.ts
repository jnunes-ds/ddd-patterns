import RepositoryInterface from "@domain/repository/repository-interface";
import Order from "@domain/entity/order";

export default interface IOrderRepository extends RepositoryInterface<Order> {}