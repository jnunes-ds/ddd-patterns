import RepositoryInterface from "./repository-interface";
import Product from "@domain/entity/product";

export default interface IProductRepository
  extends RepositoryInterface<Product> {}
