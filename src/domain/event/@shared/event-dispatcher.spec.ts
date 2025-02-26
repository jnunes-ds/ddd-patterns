import EventDispatcher from "./event-dispatcher";
import SendEmailWhenProductIsCreatedHandler from "@domain/event/product/handler/send-email-when-product-is-created.handler";

describe("Domain events tests", () => {
  it("should register an evento handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(1);
  });
});