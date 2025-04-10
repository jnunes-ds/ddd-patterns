import {IValidator} from "@domain/@shared/validator/validator.interface";
import Customer from "@domain/customer/entity/customer";
import {z} from "zod";

export default class CustomerZodValidator implements IValidator<Customer> {
  validate(entity: Customer): void {
    try {
      z.object({
        id: z.string().min(1, "id is required"),
        name: z.string().min(3, "name is required"),
      }).parse({
        id: entity.id,
        name: entity.name,
      })
    } catch (errors) {
      const e = errors as z.ZodError;

      e.errors.forEach(error => {
        entity.notification.addError({
          context: "customer",
          message: error.message,
        });
      });
    }
  }
}