import RepositoryInterface from "./repository-interface";
import Product from "@domain/entity/product";

export default interface ProductRepositoryInterface
  extends RepositoryInterface<Product> {}
