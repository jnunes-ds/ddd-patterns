import EventHandlerInterface from "@domain/@shared/event/event-handler.interface";
import CustomerCreatedEvent from "@domain/customer/event/customer-created.event";

export default class SendEmail1WhenCustomerIsCreatedHandler
  implements EventHandlerInterface<CustomerCreatedEvent> {
  handle(event: CustomerCreatedEvent): void {
    console.log("Esse é o primeiro console.log do evento: CustomerCreated");
  }
}