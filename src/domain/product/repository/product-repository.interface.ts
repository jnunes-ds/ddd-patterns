import RepositoryInterface from "../../@shared/repository/repository-interface";
import Product from "@domain/product/entity/product";
import IProduct from "@domain/product/entity/product.interface";

export default interface IProductRepository
  extends RepositoryInterface<IProduct> {}
