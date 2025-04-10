import IProduct from "./product.interface";
import Entity from "@domain/@shared/entity/entity.abstract";
import ProductValidatorFactory from "@domain/product/factory/product.validator.factory";

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
    const validator = ProductValidatorFactory.create();
    validator.validate(this);
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