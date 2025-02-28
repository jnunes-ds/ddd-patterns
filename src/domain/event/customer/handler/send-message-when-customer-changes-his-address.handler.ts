import EventHandlerInterface from "@domain/event/@shared/event-handler.interface";
import CustomerCreatedEvent from "@domain/event/customer/customer-created.event";
import CustomerChangeAddressEvent from "@domain/event/customer/customer-change-address.event";

export default class SendMessageWhenCustomerChangesHisAddressHandler
  implements EventHandlerInterface<CustomerChangeAddressEvent> {
  handle(event: CustomerChangeAddressEvent): void {
    const address = `${event.eventData.address.street}, ${event.eventData.address.number}, ${event.eventData.address.city}/${event.eventData.address.state} - ${event.eventData.address.zipCode}`;
    console.log(`Endereço do cliente: \x1b[32m${event.eventData.id}\x1b[0m, \x1b[32m${event.eventData.name}\x1b[0m alterado para: \x1b[33m${address}`);
  }
}