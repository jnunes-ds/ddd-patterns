import IProduct from "@domain/product/entity/product.interface";
import Product from "@domain/product/entity/product";
import {v4 as uuid} from "uuid";
import ProductB from "@domain/product/entity/product-b";

type ProductType = "a" | "b";


export default class ProductFactory {
  public static create(type: ProductType = 'a', name: string, price: number): IProduct {
    switch (type) {
      case "a":
        return new Product(uuid(), name, price);
      case "b":
        return new ProductB(uuid(), name, price);
      default:
        throw new Error("Invalid product type");
    }
  }
}