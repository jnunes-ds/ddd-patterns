class Customer {

  private _address: string = "";
  private _active: boolean = false;

  constructor(
    private _id: string,
    private _name: string
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

}

const customer = new Customer("1", "John Doe");