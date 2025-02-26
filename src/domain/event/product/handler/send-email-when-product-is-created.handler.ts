import EventHandlerInterface from "@domain/event/@shared/event-handler.interface";
import ProductCreatedEvent from "@domain/event/product/product-created.event";

export default class SendEmailWhenProductIsCreatedHandler
  implements EventHandlerInterface<ProductCreatedEvent> {
  handle(event: ProductCreatedEvent): void {
    console.log("Sending email to ......");
  }
}