import 'module-alias/register';
import Customer from "@domain/customer/entity/customer";
import Address from "@domain/customer/value-object/address";
import OrderItem from "@domain/checkout/entity/order_item";
import Order from "@domain/checkout/entity/order";

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