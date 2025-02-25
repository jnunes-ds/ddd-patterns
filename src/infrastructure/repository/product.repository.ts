import IProductRepository from "@domain/repository/product-repository";
import {Promise} from "ts-toolbelt/out/Any/Promise";
import Product from "@domain/entity/product";
import ProductModel from "@infra/db/sequelize/model/product.model";

export default class ProductRepository
  implements IProductRepository {
  async create(entity: Product): Promise<void> {
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
    const productModel = await ProductModel.findOne({where: {id}});
    return new Product(
      productModel.id,
      productModel.name,
      productModel.price
    );
  }
  async findAll(): Promise<Product[]> {
    const productModels = await ProductModel.findAll();
    return productModels.map(
      (productModel) =>
        new Product(productModel.id, productModel.name, productModel.price)
    );
  }
}