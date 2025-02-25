import RepositoryInterface from "@domain/repository/repository-interface";
import Order from "@domain/entity/order";
import OrderItem from "@domain/entity/order_item";

export default interface IOrderRepository extends RepositoryInterface<Order> {
  findOrderItem(orderItemId: string, orderId: string): Promise<OrderItem>;
  findAllCustomerOrders(customerId: string): Promise<Order[]>;
}