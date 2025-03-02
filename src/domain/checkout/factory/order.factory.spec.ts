import {v4 as uuid} from "uuid";
import OrderFactory from "@domain/checkout/factory/order.factory";


describe('Order factory unity tests', () => {
  it("should create an order", () => {
    const orderProps = {
      id: uuid(),
      customerId: uuid(),
      items: [
        {
          id: uuid(),
          name: "Product1",
          productId: uuid(),
          quantity: 2,
          price: 100,
        },
      ]
    }

    const order = OrderFactory.create(orderProps);

    expect(order.id).toEqual(orderProps.id);
    expect(order.customerId).toEqual(orderProps.customerId);
    expect(order.items.length).toBe(1);
  });

});