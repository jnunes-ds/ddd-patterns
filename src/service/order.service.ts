import Order from "../entity/order";

export default class OrderService {
  public static total(orders: Order[]): number {
    return orders.reduce((acc, order) => {
      return acc + order.total();
    }, 0);
  }
}