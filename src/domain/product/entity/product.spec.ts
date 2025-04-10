import Product from "./product";

describe("Product unity tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      new Product("", "Product 1", 100);
    }).toThrowError("product: id is required");
  });

  it("should throw error when name is empty", () => {
    expect(() => {
      new Product("123", "", 100);
    }).toThrowError("product: name is required");
  });

  it("should throw error when price is empty", () => {
    expect(() => {
      new Product("123", "Product 1", -1);
    }).toThrowError("product: price must be greater than 0");
  });

  it("should throw a list of errors when more than one argument is incorrect", () => {
    expect(() => {
      new Product("", "", -1);
    }).toThrowError("product: id is required, product: name is required, product: price must be greater than 0");
  });

  it("should change name", () => {
    const product = new Product("123", "Product 1", 100);
    product.changeName("Product 2");
    expect(product.name).toBe("Product 2");
  });

  it("should change price", () => {
    const product = new Product("123", "Product 1", 100);
    product.changePrice(150);
    expect(product.price).toBe(150);
  });
});