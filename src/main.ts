import Customer from "./entity/customer";
import Address from "./entity/address";
import OrderItem from "./entity/order_item";
import Order from "./entity/order";

function main () {
  const customer = new Customer("1", "John Doe");
  customer.address = new Address("Rua do beco", 123, "Brasília", "DF", "12345-678");
  customer.activate();

  const item1 = new OrderItem("1", "product1", "Item 1", 100, 1);
  const item2 = new OrderItem("2", "product245", "Item 2", 15, 3);

  const order = new Order("1", "123", [item1, item2]);
  order.printOrder();
}

export {main};