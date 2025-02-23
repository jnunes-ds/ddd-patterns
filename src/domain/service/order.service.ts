import Order from "../entity/order";
import Customer from "../entity/customer";
import OrderItem from "../entity/order_item";
import {v4 as uuid} from "uuid";

export default class OrderService {
  public static placeOrder(customer: Customer, items: OrderItem[]): Order {
    if (!items.length) throw new Error("Order must have at least one item");
    const order = new Order(uuid(), customer.id, items);
    customer.addRewardPoints(order.total() / 2);
    return order;
  }

  public static total(orders: Order[]): number {
    return orders.reduce((acc, order) => {
      return acc + order.total();
    }, 0);
  }
}