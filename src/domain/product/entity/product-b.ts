import IProduct from "./product.interface";

export default class ProductB implements IProduct {
  constructor(
    private _id: string,
    private _name: string,
    private _price: number
  ) {
    this.validate();
  }

  get id(): string {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get price() {
    return this._price*2;
  }

  validate() {
    if (!this._id) throw new Error("Id is required");
    if (!this._name) throw new Error("name is required");
    if (!this._price || this._price < 0) throw new Error("Price must be grater than 0");
  }

  changeName(name: string) {
    this._name = name;
    this.validate();
  }

  changePrice(price: number) {
    this._price = price;
    this.validate();
  }
}