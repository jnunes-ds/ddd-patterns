import Order from "@domain/checkout/entity/order";
import OrderItem from "@domain/checkout/entity/order_item";

interface OrderFactoryProps {
  id: string;
  customerId: string;
  items: {
    id: string;
    name: string;
    productId: string;
    quantity: number;
    price: number;
  }[];
}

export default class OrderFactory {
  public static create(props: OrderFactoryProps): Order {
    const items = props.items
      .map(item => new OrderItem(
        item.id, item.productId, item.name, item.price, item.quantity
      ));

    return new Order(props.id, props.customerId, items);
  }
}