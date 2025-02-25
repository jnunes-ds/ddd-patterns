import {Sequelize} from "sequelize-typescript";

import OrderModel from "@infra/db/sequelize/model/order.model";
import CustomerModel from "@infra/db/sequelize/model/customer.model";
import OrderItemModel from "@infra/db/sequelize/model/order-item.model";
import ProductModel from "@infra/db/sequelize/model/product.model";

import Customer from "@domain/entity/customer";
import Address from "@domain/entity/address";
import Product from "@domain/entity/product";
import OrderItem from "@domain/entity/order_item";
import Order from "@domain/entity/order";

import ProductRepository from "./product.repository";
import CustomerRepository from "./customer.repository";
import OrderRepository from "./order.repository";

describe("Order Repository Unit tests", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: {force: true},
    });

    sequelize.addModels([
      OrderModel,
      CustomerModel,
      OrderItemModel,
      ProductModel
    ]);
    await sequelize.sync();
  });

  afterEach(async () => {
    if (sequelize) await sequelize.close();
  });

  it("should create an order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("c1", "Customer 1");
    const address = new Address("Street 1", 12, "City", "State", "12345-123");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository()
    const product = new Product("p1", "Product 1", 10);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      "i1",
      product.id,
      product.name,
      product.price,
      2
    );

    const orderRepository = new OrderRepository();
    const order = new Order("o1", customer.id, [orderItem]);
    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
        where: {id: order.id},
        include: ["items"]
    });
    expect(orderModel.toJSON()).toStrictEqual({
      id: "o1",
      customer_id: customer.id,
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          product_id: product.id,
          order_id: order.id,
          quantity: orderItem.quantity,
          price: orderItem.price
        }
      ]
    });
  });
});