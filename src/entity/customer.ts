import Address from "./address";

export default class Customer {

  private _address?: Address;
  private _active: boolean = false;

  constructor(
    private _id: string,
    private _name: string,
  ) {
    this.validate();
  }

  validate() {
    if (!this._name) throw new Error("Name is required");
    if (!this._id) throw new Error("Invalid id");
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

  set address(address: Address) {
    this._address = address;
  }

}