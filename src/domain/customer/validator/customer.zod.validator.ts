import {IValidator} from "@domain/@shared/validator/validator.interface";
import Customer from "@domain/customer/entity/customer";
import {z} from "zod";

export default class CustomerZodValidator implements IValidator<Customer> {
  validate(entity: Customer): void {
    try {
      z.object({
        id: z.string().min(1, "Id is required").uuid("Invalid UUID format"),
        name: z.string().min(3, "Name is required").max(255, "Name must be less than 255 characters"),
      }).safeParse({
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