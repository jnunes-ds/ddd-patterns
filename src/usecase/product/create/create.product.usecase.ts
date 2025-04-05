import IProductRepository from "@domain/product/repository/product-repository.interface";
import {InputCreateProductDTO, OutputCreateProductDTO} from "./create.product.dto";
import ProductFactory from "@domain/product/factory/product.factory";

export default class CreateProductUsecase {
  constructor(private productRepository: IProductRepository) {}

  async execute(product: InputCreateProductDTO): Promise<OutputCreateProductDTO> {
    const newProduct = ProductFactory.create("a", product.name, product.price);

    await this.productRepository.create(newProduct);

    return {
      id: newProduct.id,
      name: newProduct.name,
      price: newProduct.price,
    };
  }
}