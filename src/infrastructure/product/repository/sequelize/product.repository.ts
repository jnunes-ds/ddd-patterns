import IProductRepository from "@domain/product/repository/product-repository.interface";
import {Promise} from "ts-toolbelt/out/Any/Promise";
import Product from "@domain/product/entity/product";
import ProductModel from "@infra/product/repository/sequelize/product.model";
import IProduct from "@domain/product/entity/product.interface";

export default class ProductRepository
  implements IProductRepository {
  async create(entity: IProduct): Promise<void> {
    await ProductModel.create({
      id: entity.id,
      name: entity.name,
      price: entity.price,
    });
  }

  async update(entity: Product): Promise<void> {
    await ProductModel.update(
      {
        name: entity.name,
        price: entity.price,
      },
      {where: {id: entity.id}}
    );
  }

  async find(id: string): Promise<Product> {
    try {
      const productModel = await ProductModel.findOne({where: {id}});
      return new Product(
        productModel.id,
        productModel.name,
        productModel.price
      );
    } catch {
      throw new Error("Product not found");
    }
  }
  async findAll(): Promise<Product[]> {
    const productModels = await ProductModel.findAll();
    return productModels.map(
      (productModel) =>
        new Product(productModel.id, productModel.name, productModel.price)
    );
  }
}