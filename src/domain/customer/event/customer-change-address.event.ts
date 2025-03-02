import EventInterface from "@domain/@shared/event/event.interface";
import Customer from "@domain/customer/entity/customer";

export default class CustomerChangeAddressEvent implements EventInterface {
  dataTimeOccured: Date;
  eventData: Customer;
  constructor(data: Customer) {
    this.dataTimeOccured = new Date();
    this.eventData = data;
  }
}