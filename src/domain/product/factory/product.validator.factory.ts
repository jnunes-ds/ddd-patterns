import {IValidator} from "@domain/@shared/validator/validator.interface";
import Product from "@domain/product/entity/product";
import ProductZodValidator from "@domain/product/validator/product.zod.validator";

export default class ProductValidatorFactory {
  static create(): IValidator<Product> {
    return new ProductZodValidator();
  }
}