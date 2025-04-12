import Address from "../value-object/address";
import Entity from "@domain/@shared/entity/entity.abstract";
import NotificationError from "@domain/@shared/notification/notification.error";
import CustomerValidatorFactory from "@domain/customer/factory/customer.validator.factory";

export default class Customer extends Entity {

  private _name: string;
  private _active: boolean;
  private _rewardPoints;
  private _address?: Address;

  constructor(
    id: string,
    name: string,
  ) {
    super();
    this._id = id;
    this._name = name;
    this._active = false;
    this._rewardPoints = 0;
    this.validate();

    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErrors());
    }
  }

  get name(): string {
    return this._name;
  }

  get rewardPoints(): number {
    return this._rewardPoints;
  }

  get isActive() {
    return {isActive: this._active};
  }

  get address(): Address {
    return this._address;
  }

  validate() {
    const validator = CustomerValidatorFactory.create();
    validator.validate(this);
  }

  changeName(name: string) {
    this._name = name;
    this.validate();
  }

  changeAddress(address: Address) {
    this._address = address;
  }

  activate() {
    if (!this._address) {
      this.notification.addError({
        context: "customer",
        message: "Address is required to activate customer",
      });
      throw new NotificationError(this.notification.getErrors());
    }

    this._active = true;
  }

  deactivate() {
    this._active = false;
  }

  addRewardPoints(points: number) {
    this._rewardPoints += points;
  }

  set address(address: Address) {
    this._address = address;
  }

}