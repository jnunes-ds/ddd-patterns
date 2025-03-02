import EventHandlerInterface from "@domain/@shared/event/event-handler.interface";
import CustomerChangeAddressEvent from "@domain/customer/event/customer-change-address.event";

export default class SendMessageWhenCustomerChangesHisAddressHandler
  implements EventHandlerInterface<CustomerChangeAddressEvent> {
  handle(event: CustomerChangeAddressEvent): void {
    const address = `${event.eventData.address.street}, ${event.eventData.address.number}, ${event.eventData.address.city}/${event.eventData.address.state} - ${event.eventData.address.zipCode}`;
    console.log(`Endereço do cliente: \x1b[32m${event.eventData.id}\x1b[0m, \x1b[32m${event.eventData.name}\x1b[0m alterado para: \x1b[33m${address}\x1b[0m`);
  }
}