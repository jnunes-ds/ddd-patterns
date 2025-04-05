import IProductRepository from "@domain/product/repository/product-repository.interface";
import {InputFindProductDTO, OutputFindProductDTO} from "./find.product.dto";

export default class FindProductUsecase {
  constructor(private productRepository: IProductRepository) {}

  async execute(input: InputFindProductDTO): Promise<OutputFindProductDTO> {
    const response = await this.productRepository.find(input.id);

    return {
      id: response.id,
      name: response.name,
      price: response.price,
    }
  }
}