import Order from "@domain/entity/order";
import OrderModel from "@infra/db/sequelize/model/order.model";
import OrderItemModel from "@infra/db/sequelize/model/order-item.model";

export default class OrderRepository {
  async create(entity: Order): Promise<void> {
    await OrderModel.create({
      id: entity.id,
      customer_id: entity.customerId,
      total: entity.total(),
      items: entity.items.map((item) => ({
        id: item.id,
        name: item.name,
        product_id: item.productId,
        order_id: entity.id,
        quantity: item.quantity,
        price: item.price
      }))
    }, {
      include: [{model: OrderItemModel}]
    });
  }
}