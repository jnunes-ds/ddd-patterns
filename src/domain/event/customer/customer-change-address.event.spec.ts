import EventDispatcher from "@domain/event/@shared/event-dispatcher";
import Customer from "@domain/entity/customer";
import SendMessageWhenCustomerChangesHisAddressHandler
  from "@domain/event/customer/handler/send-message-when-customer-changes-his-address.handler";
import CustomerChangeAddressEvent from "@domain/event/customer/customer-change-address.event";
import Address from "@domain/entity/address";

describe("Customer Change his address event tests", () => {
  it("should register customer changeAddress handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendMessageWhenCustomerChangesHisAddressHandler();

    eventDispatcher.register("CustomerChangeAddressEvent", eventHandler);

    expect(eventDispatcher.eventHandlers["CustomerChangeAddressEvent"]).toBeDefined();
    expect(eventDispatcher.eventHandlers["CustomerChangeAddressEvent"].length).toBe(1);
    expect(eventDispatcher.eventHandlers["CustomerChangeAddressEvent"][0]).toMatchObject(eventHandler);
  });

  it("should unregister an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendMessageWhenCustomerChangesHisAddressHandler();

    eventDispatcher.register("CustomerChangeAddressEvent", eventHandler);
    expect(eventDispatcher.eventHandlers["CustomerChangeAddressEvent"]).toBeDefined();
    expect(eventDispatcher.eventHandlers["CustomerChangeAddressEvent"].length).toBe(1);

    eventDispatcher.unregister("CustomerChangeAddressEvent", eventHandler);
    expect(eventDispatcher.eventHandlers["CustomerChangeAddressEvent"]).toBeDefined();
    expect(eventDispatcher.eventHandlers["CustomerChangeAddressEvent"].length).toBe(0);
  });

  it("should unregister all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendMessageWhenCustomerChangesHisAddressHandler();

    eventDispatcher.register("CustomerChangeAddressEvent", eventHandler);
    expect(eventDispatcher.eventHandlers["CustomerChangeAddressEvent"]).toMatchObject(eventHandler);

    eventDispatcher.unRegisterAll();
    expect(eventDispatcher.eventHandlers["CustomerChangeAddressEvent"]).toBeUndefined();
  });

  it("should call SendMessageWhenCustomerChangesHisAddressHandler when an event is notified", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendMessageWhenCustomerChangesHisAddressHandler();
    const spyEventHandler = jest.spyOn(eventHandler, "handle");
    const spyConsoleLog = jest.spyOn(console, "log");

    eventDispatcher.register("CustomerChangeAddressEvent", eventHandler);

    expect(
      eventDispatcher.eventHandlers["CustomerChangeAddressEvent"][0]
    ).toMatchObject(eventHandler);

    const customer = new Customer(
      "id123",
      "John Doe",
    );
    const address = new Address("Rua da Pedra", 115, "Salvador", "BA", "12345-678");
    customer.changeAddress(address);

    const customerChangeAddressEvent = new CustomerChangeAddressEvent(customer);

    eventDispatcher.notify(customerChangeAddressEvent);

    expect(spyEventHandler).toHaveBeenCalled();
    const stringfiedAddress = `${address.street}, ${address.number}, ${address.city}/${address.state} - ${address.zipCode}`;
    const expectedMessage = `Endereço do cliente: \x1b[32m${customer.id}\x1b[0m, \x1b[32m${customer.name}\x1b[0m alterado para: \x1b[33m${stringfiedAddress}`;
    expect(spyConsoleLog).toHaveBeenCalledWith(expectedMessage);
  });
});