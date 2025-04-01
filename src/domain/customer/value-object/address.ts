export default class Address {
  constructor(
    private _street: string,
    private _number: number,
    private _city: string,
    private _state: string,
    private _zipCode: string,
  ) {
    this.validate();
  }

  get street() {
    return this._street;
  }

  get number() {
    return this._number;
  }

  get city() {
    return this._city;
  }

  get state() {
    return this._state;
  }

  get zipCode() {
    return this._zipCode;
  }

  validate() {
    if (!this._street) throw new Error("Street is required");
    if (!this._number) throw new Error("Number is required");
    if (!this._city) throw new Error("City is required");
    if (!this._state) throw new Error("State is required");
    if (!this._zipCode) throw new Error("Zip code is required");
  }

  toString() {
    return `${this._street}, ${this._number} - ${this._city}/${this._state} - ${this._zipCode}`;
  }
}