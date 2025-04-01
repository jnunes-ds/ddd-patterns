import EventInterface from "@domain/@shared/event/event.interface";

export default class ProductCreatedEvent implements EventInterface {
  dataTimeOccured: Date;
  eventData: any;
  constructor(data: any) {
    this.dataTimeOccured = new Date();
    this.eventData = data;
  }
}