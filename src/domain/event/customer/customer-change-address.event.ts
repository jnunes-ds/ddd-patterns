import EventInterface from "@domain/event/@shared/event.interface";
import Customer from "@domain/entity/customer";

export default class CustomerChangeAddressEvent implements EventInterface {
  dataTimeOccured: Date;
  eventData: Customer;
  constructor(data: Customer) {
    this.dataTimeOccured = new Date();
    this.eventData = data;
  }
}