import SendEmail1WhenCustomerIsCreatedHandler from "@domain/customer/event/handler/send-email-1-when-customer-is-created.handler";
import CustomerCreatedEvent from "@domain/customer/event/customer-created.event";
import EventDispatcher from "@domain/@shared/event/event-dispatcher";
import Customer from "@domain/customer/entity/customer";
import SendEmail2WhenCustomerIsCreatedHandler
  from "@domain/customer/event/handler/send-email-2-when-customer-is-created.handler";

describe("Customer created event tests", () => {
  it("should register both customer-createtd-event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler1 = new SendEmail1WhenCustomerIsCreatedHandler();
    const eventHandler2 = new SendEmail2WhenCustomerIsCreatedHandler();

    eventDispatcher.register("CustomerCreatedEvent", eventHandler1);
    eventDispatcher.register("CustomerCreatedEvent", eventHandler2);

    expect(eventDispatcher.eventHandlers["CustomerCreatedEvent"]).toBeDefined();
    expect(eventDispatcher.eventHandlers["CustomerCreatedEvent"].length).toBe(2);
    expect(eventDispatcher.eventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandler1);
    expect(eventDispatcher.eventHandlers["CustomerCreatedEvent"][1]).toMatchObject(eventHandler2);
  });

  it("should unregister an specific event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler1 = new SendEmail1WhenCustomerIsCreatedHandler();
    const eventHandler2 = new SendEmail2WhenCustomerIsCreatedHandler();

    eventDispatcher.register("CustomerCreatedEvent", eventHandler1);
    eventDispatcher.register("CustomerCreatedEvent", eventHandler2);
    expect(eventDispatcher.eventHandlers["CustomerCreatedEvent"]).toBeDefined();
    expect(eventDispatcher.eventHandlers["CustomerCreatedEvent"].length).toBe(2);

    eventDispatcher.unregister("CustomerCreatedEvent", eventHandler1);
    expect(eventDispatcher.eventHandlers["CustomerCreatedEvent"]).toBeDefined();
    expect(eventDispatcher.eventHandlers["CustomerCreatedEvent"].length).toBe(1);
    expect(eventDispatcher.eventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandler2);
  });

  it("should unregister all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler1 = new SendEmail1WhenCustomerIsCreatedHandler();
    const eventHandler2 = new SendEmail2WhenCustomerIsCreatedHandler();

    eventDispatcher.register("CustomerCreatedEvent", eventHandler1);
    eventDispatcher.register("CustomerCreatedEvent", eventHandler2);
    expect(eventDispatcher.eventHandlers["CustomerCreatedEvent"]).toMatchObject({...eventHandler1, ...eventHandler2});

    eventDispatcher.unRegisterAll();
    expect(eventDispatcher.eventHandlers["CustomerCreatedEvent"]).toBeUndefined();
  });

  it("should call both handlers when an event is notified", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler1 = new SendEmail1WhenCustomerIsCreatedHandler();
    const eventHandler2 = new SendEmail2WhenCustomerIsCreatedHandler();
    const spyEventHandler1 = jest.spyOn(eventHandler1, "handle");
    const spyEventHandler2 = jest.spyOn(eventHandler2, "handle");
    const spyConsoleLog = jest.spyOn(console, "log").mockImplementation(() => {});

    eventDispatcher.register("CustomerCreatedEvent", eventHandler1);
    eventDispatcher.register("CustomerCreatedEvent", eventHandler2);

    expect(
      eventDispatcher.eventHandlers["CustomerCreatedEvent"][0]
    ).toMatchObject(eventHandler1);

    const customer = new Customer(
      "id123",
      "John Doe",
    )

    const customerCreatedEvent = new CustomerCreatedEvent({
      id: customer.id,
      name: customer.name,
    });

    eventDispatcher.notify(customerCreatedEvent);

    expect(spyEventHandler1).toHaveBeenCalled();
    expect(spyEventHandler2).toHaveBeenCalled();
    expect(spyConsoleLog).toHaveBeenNthCalledWith(1, "Esse é o primeiro console.log do evento: CustomerCreated")
    expect(spyConsoleLog).toHaveBeenNthCalledWith(2, "Esse é o segundo console.log do evento: CustomerCreated")

  });
});