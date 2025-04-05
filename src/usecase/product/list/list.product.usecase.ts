import IProductRepository from "@domain/product/repository/product-repository.interface";
import {InputListProductDTO, OutputListProductDTO} from "./list.product.dto";
import IProduct from "@domain/product/entity/product.interface";

export default class ListProductUsecase {
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(input: InputListProductDTO): Promise<OutputListProductDTO> {
    const products = await this.productRepository.findAll();

    return OutputMapper.toOutput(products);
  }
}

class OutputMapper {
  static toOutput(products: IProduct[]): OutputListProductDTO {
    return {
      products: products.map(product => ({
        id: product.id,
        name: product.name,
        price: product.price,
      }))
    }
  }
}