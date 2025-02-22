import OrderItem from "../entity/order_item";
import Order from "../entity/order";
import OrderService from "./order.service";

describe("Order Service Unit tests", () => {
  it("should get total of all orders", () => {
    const orderItem1 = new OrderItem("i1", "Item 1", "Produto 1", 100, 1);
    const orderItem2 = new OrderItem("i2", "Item 2", "Produto 2", 200, 2);
    const orderItem3 = new OrderItem("i3", "Item 3", "Produto 3", 300, 3);

    const order1 = new Order("o1", "c1", [orderItem1, orderItem2, orderItem3]);
    const order2 = new Order("o2", "c2", [orderItem1, orderItem2]);

    const total = OrderService.total([order1, order2]);

    expect(total).toBe(100 + (200 * 2) + (300 * 3) + 100 + (200 * 2));
  });
});