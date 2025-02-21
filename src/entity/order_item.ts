export default class OrderItem {
  constructor(
    private _id: string,
    private _name: string,
    private _price: number,
  ) {}

  get price(): number {
    return this._price;
  }

  printOrderItem() {
    console.log(` ${this._name}: {`);
    console.log(`\u001b[34m   ID: \u001b[33m ${this._id}`);
    console.log(`\u001b[34m   Name: \u001b[33m ${this._name}`);
    console.log(`\u001b[34m   Price: \u001b[32m ${this._price}`);
    console.log("\u001b[0m }");
  }
}

