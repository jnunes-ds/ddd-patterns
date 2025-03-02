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
    const item1 = new OrderItem("item-1", "order-1", "item-1", 100, 2);
    const item2 = new OrderItem("item-2", "order-2", "item-2", 200, 3);
    const order1 = new Order("123", "customer-id", [item1]);
    let total = order1.total();

    expect(total).toBe(200);
    const order2 = new Order("123", "customer-id", [item1, item2]);
    total = order2.total();
    expect(total).toBe(800);
  });

  it("should check if the item quantity is grater than 0", () => {
    expect(() => {
      const item1 = new OrderItem("item", "product", "item", 100, 0);
      new Order("123", "customer-id", [item1]);
    }).toThrowError("Item quantity must be grater than 0");
  });
});