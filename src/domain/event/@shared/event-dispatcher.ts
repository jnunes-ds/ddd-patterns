import EventDispatcherInterface from "@domain/event/@shared/event-dispatcher.interface";
import EventHandlerInterface from "@domain/event/@shared/event-handler.interface";

export default class EventDispatcher implements EventDispatcherInterface {

  private eventHandlers: {[eventName: string]: EventHandlerInterface[]} = {};

  get getEventHandlers(): {[eventName: string]: EventHandlerInterface[]} {
    return this.eventHandlers;
  }

  register(eventName: string, eventHandler: EventHandlerInterface) {
    if (!this.eventHandlers[eventName]) {
      this.eventHandlers[eventName] = [];
    }
    this.eventHandlers[eventName].push(eventHandler);
  }

  unregister(eventName: string, eventHandler: EventHandlerInterface): void {
    if (!this.eventHandlers[eventName]) {
      return void 0;
    }
    this.eventHandlers[eventName] = this.eventHandlers[eventName]
      .filter((handler) => handler !== eventHandler);
  }

  unRegisterAll(): void {
    this.eventHandlers = {};
  }

  notify(event: any) {
    throw new Error("Method not implemented.");
  }
}