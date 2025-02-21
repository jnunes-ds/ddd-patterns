import Order from "./order";
import OrderItem from "./order_item";

describe("Order unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      new Order("", "customer-id", []);
    }).toThrowError("Order ID is required");
  });

  it("should throw error when customer id is empty", () => {
    expect(() => {
      new Order("123", "", []);
    }).toThrowError("Customer ID is required");
  });

  it("should throw error when items list is empty", () => {
    expect(() => {
      new Order("123", "customer-id", []);
    }).toThrowError("Order Need to have at least one item");
  });

  it("should calculate total price correctly", () => {
    const item1 = new OrderItem("item-1", "item-1", 100);
    const item2 = new OrderItem("item-2", "item-2", 200);
    const order1 = new Order("123", "customer-id", [item1]);
    let total = order1.total();

    expect(total).toBe(100);
    const order2 = new Order("123", "customer-id", [item1, item2]);
    total = order2.total();
    expect(total).toBe(300);
  });
});