import Order from "@domain/entity/order";
import OrderModel from "@infra/db/sequelize/model/order.model";
import OrderItemModel from "@infra/db/sequelize/model/order-item.model";
import IOrderRepository from "@domain/repository/order-repository";
import {Promise} from "ts-toolbelt/out/Any/Promise";
import OrderItem from "@domain/entity/order_item";

export default class OrderRepository implements IOrderRepository {
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

  async update(entity: Order): Promise<void> {
    const transaction = await OrderModel.sequelize.transaction();

    try {
      await OrderModel.update({
        total: entity.items.reduce((acc, item) => acc + item.price * item.quantity, 0),
        items: entity.items
      }, {
        where: {id: entity.id},
        transaction
      });

      for (const item of entity.items) {
        const [orderItem, created] = await OrderItemModel.findOrCreate({
          where: {id: item.id, order_id: entity.id},
          defaults: {
            id: item.id,
            name: item.name,
            product_id: item.productId,
            order_id: entity.id,
            quantity: item.quantity,
            price: item.price,
          },
          transaction,
        });

        if (!created) {
          await orderItem.update(
            {
              name: item.name,
              product_id: item.productId,
              quantity: item.quantity,
              price: item.price,
            },
            { transaction }
          );
        }
      }

      await transaction.commit();
    } catch (e) {
      await transaction.rollback();
      throw new Error("Error on update order");
    }

  }

  async find(id: string): Promise<Order> {
    const orderModel = await OrderModel.findOne({where: {id}, include: [{model: OrderItemModel}]});

    if (!orderModel) throw new Error("Order not found");

    return new Order(
      orderModel.id,
      orderModel.customer_id,
      orderModel.items.map((item) => new OrderItem(
        item.id,
        item.product_id,
        item.name,
        item.price,
        item.quantity
      )
    ));
  }

  async findAll(): Promise<Order[]> {
    throw new Error("Method not implemented.");
  }

}