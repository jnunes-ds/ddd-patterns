import EventDispatcherInterface from "@domain/@shared/event/event-dispatcher.interface";
import EventHandlerInterface from "@domain/@shared/event/event-handler.interface";

type EventHandlers = Record<string, EventHandlerInterface[]>;

export default class EventDispatcher implements EventDispatcherInterface {

  private _eventHandlers: EventHandlers = {};

  get eventHandlers(): EventHandlers {
    return this._eventHandlers;
  }

  register(eventName: string, eventHandler: EventHandlerInterface) {
    if (!this._eventHandlers[eventName]) {
      this._eventHandlers[eventName] = [];
    }
    this._eventHandlers[eventName].push(eventHandler);
  }

  unregister(eventName: string, eventHandler: EventHandlerInterface): void {
    if (!this._eventHandlers[eventName]) {
      return void 0;
    }
    this._eventHandlers[eventName] = this._eventHandlers[eventName]
      .filter((handler) => handler !== eventHandler);
  }

  unRegisterAll(): void {
    this._eventHandlers = {};
  }

  notify(event: any): void {
    const eventName = event.constructor.name;
    if (this._eventHandlers[eventName]) {
      this._eventHandlers[eventName].forEach((handler) => {
        handler.handle(event);
      });
    }
  }
}