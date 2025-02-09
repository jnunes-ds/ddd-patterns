class Customer {
  constructor(
    private _id: number,
    private _name: string,
    private _address: string,
  ) {}

  get id(): number {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get address(): string {
    return this._address;
  }

  set name(name: string) {
    this._name = name;
  }

  set address(address: string) {
    this._address = address;
  }

}