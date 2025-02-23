import Address from "./address";

export default class Customer {

  private _active: boolean;
  private _rewardPoints;
  private _address?: Address;

  constructor(
    private _id: string,
    private _name: string,
  ) {
    this._active = false;
    this._rewardPoints = 0;
    this.validate();
  }

  get name(): string {
    return this._name;
  }

  get rewardPoints(): number {
    return this._rewardPoints;
  }

  get id(): string {
    return this._id;
  }

  getActiveStatus() {
    return {isActive: this._active};
  }

  validate() {
    if (!this._id) throw new Error("Id is required");
    if (!this._name) throw new Error("Name is required");
  }

  changeName(name: string) {
    this._name = name;
    this.validate();
  }

  activate() {
    if (!this._address) throw new Error("Address is required");

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