import EventHandlerInterface from "@domain/event/@shared/event-handler.interface";
import CustomerCreatedEvent from "@domain/event/customer/customer-created.event";

export default class SendEmail2WhenCustomerIsCreatedHandler
  implements EventHandlerInterface<CustomerCreatedEvent> {
  handle(event: CustomerCreatedEvent): void {
    console.log("Esse é o segundo console.log do evento: CustomerCreated");
  }
}