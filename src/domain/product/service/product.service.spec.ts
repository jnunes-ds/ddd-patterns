import Product from "@domain/product/entity/product";
import ProductService from "./product.service";

describe("Product Service unit tests", () => {
  it("Should change the prices of all products", () => {
    const product1 = new Product("123", "Product 1", 10);
    const product2 = new Product("124", "Product 2", 20);
    const product3 = new Product("125", "Product 3", 30);
    const products = [product1, product2, product3];

    ProductService.increasePrices(products, 100);

    expect(product1.price).toBe(20);
    expect(product2.price).toBe(40);
    expect(product3.price).toBe(60);
  });
});