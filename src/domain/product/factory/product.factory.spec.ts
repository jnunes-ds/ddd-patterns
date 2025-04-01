import ProductFactory from "@domain/product/factory/product.factory";

describe("Product Factory unit tests", () => {
  it("should  create a product type a", () => {
    const product = ProductFactory.create("a", "Product A", 10);
    expect(product).toMatchObject({
      id: expect.any(String),
      name: "Product A",
      price: 10,
    });
    expect(product.constructor.name).toBe("Product");
  });

  it("should  create a product type b", () => {
    const product = ProductFactory.create("b", "Product B", 10);
    expect(product).toMatchObject({
      id: expect.any(String),
      name: "Product B",
      price: 20,
    });
    expect(product.constructor.name).toBe("ProductB");
  });

  it("should throw error when type is invalid", () => {
    expect(() => {
      ProductFactory.create("c" as never, "Product C", 10);
    }).toThrowError("Invalid product type");
  });
});