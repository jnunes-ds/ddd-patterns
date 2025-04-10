import {IValidator} from "@domain/@shared/validator/validator.interface";
import Product from "@domain/product/entity/product";
import {z} from "zod";

export default class ProductZodValidator implements IValidator<Product> {
  validate(entity: Product): void {
    try {
      z.object({
        id: z.string().min(1, "id is required"),
        name: z.string().min(3, "name is required"),
        price: z.number().min(1, "price must be greater than 0"),
      }).parse({
        id: entity.id,
        name: entity.name,
        price: entity.price,
      })
    } catch (errors) {
      const e = errors as z.ZodError;
      e.errors.forEach(error => {
        entity.notification.addError({
          context: "product",
          message: error.message,
        });
      })
    }
  }
}