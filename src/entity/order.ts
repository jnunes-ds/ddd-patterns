import OrderItem from "./order_item";

export default class Order {
  constructor(
    private _id: string,
    private _customerId: string,
    private _items: OrderItem[]
  ) {}

  printOrder() {
    console.log(`Order ID: ${this._id}`);
    console.log(`Customer ID: ${this._customerId}`);
    console.log("Items: [");
    this._items.forEach(item => item.printOrderItem());
    console.log("]");
  }
}