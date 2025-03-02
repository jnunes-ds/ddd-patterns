import RepositoryInterface from "@domain/@shared/repository/repository-interface";
import Order from "@domain/checkout/entity/order";
import OrderItem from "@domain/checkout/entity/order_item";

export default interface IOrderRepository extends RepositoryInterface<Order> {
  findOrderItem(orderItemId: string, orderId: string): Promise<OrderItem>;
  findAllCustomerOrders(customerId: string): Promise<Order[]>;
}