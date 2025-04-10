import IProduct from "./product.interface";
import Entity from "@domain/@shared/entity/entity.abstract";

export default class Product  extends Entity implements IProduct {
  constructor(
    id: string,
    private _name: string,
    private _price: number
  ) {
    super();
    this._id = id;
    this.validate();

    if(this.notification.hasErrors()) {
      throw new Error(this.notification.getErrors().map((error) => `${error.context}: ${error.message}`).join(", ").replace(/, $/, ''));
    }
  }

  get name() {
    return this._name;
  }

  get price() {
    return this._price;
  }

  validate() {
    if (!this._id) this.notification.addError({
      context: "product",
      message: "Id is required",
    });
    if (!this._name) this.notification.addError({
      context: "product",
      message: "Name is required",
    });
    if (!this._price || this._price < 0) this.notification.addError({
      context: "product",
      message: "Price must be greater than 0",
    });
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