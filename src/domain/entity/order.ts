import OrderItem from "./order_item";

export default class Order {
  private _total: number;

  constructor(
    private _id: string,
    private _customerId: string,
    private _items: OrderItem[]
  ) {
    this._total = this.total();
    this.validate();
  }

  get id(): string {
    return this._id;
  }

  get customerId(): string {
    return this._customerId;
  }

  get items(): OrderItem[] {
    return this._items;
  }

  validate() {
    if (!this._id) throw new Error("Order ID is required");
    if (!this._customerId) throw new Error("Customer ID is required");
    if (!this._items.length) throw new Error("Order Need to have at least one item");
  }

  addOrderItem(orderItem: OrderItem) {
    const existingItem = this._items.find(item => item.id === orderItem.id);

    if (existingItem) throw new Error("Order Item already exists");

    this._items.push(orderItem);
    this._total = this.total();
  }

  printOrder() {
    console.log(`Order ID: ${this._id}`);
    console.log(`Customer ID: ${this._customerId}`);
    console.log("Items: [");
    this._items.forEach(item => item.printOrderItem());
    console.log("]");
  }

  total(): number {
    return this._items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }
}