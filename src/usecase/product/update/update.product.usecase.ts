import IProductRepository from "@domain/product/repository/product-repository.interface";
import {InputUpdateProductDTO, OutputUpdateProductDTO} from "./update.product.dto";

export default class UpdateProductUseCase {
  constructor(private productRepository: IProductRepository) {}

  async execute(input: InputUpdateProductDTO): Promise<OutputUpdateProductDTO> {
    const product = await this.productRepository.find(input.id);
    product.changeName(input.name);
    product.changePrice(input.price);

    return {
      id: product.id,
      name: product.name,
      price: product.price,
    };
  }
}