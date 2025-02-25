import Product from "@domain/entity/product";

type Percentage = RangeN<0, 101>;

export default class ProductService {
  static increasePrices(products: Product[], percentage: Percentage): Product[] {
    return products.map(product => {
      product.changePrice((product.price * percentage / 100) + product.price);
      return product;
    });
  }
}