import EventInterface from "@domain/event/@shared/event.interface";

export default class CustomerCreatedEvent implements EventInterface {
  dataTimeOccured: Date;
  eventData: any;
  constructor(data: any) {
    this.dataTimeOccured = new Date();
    this.eventData = data;
  }
}