import {Sequelize} from "sequelize-typescript";

import OrderModel from "@infra/order/repository/sequelize/order.model";
import CustomerModel from "@infra/customer/repository/sequelize/customer.model";
import OrderItemModel from "@infra/order/repository/sequelize/order-item.model";
import ProductModel from "@infra/product/repository/sequelize/product.model";

import Customer from "@domain/customer/entity/customer";
import Address from "@domain/customer/value-object/address";
import Product from "@domain/product/entity/product";
import OrderItem from "@domain/checkout/entity/order_item";
import Order from "@domain/checkout/entity/order";

import ProductRepository from "../../../product/repository/sequelize/product.repository";
import CustomerRepository from "../../../customer/repository/sequelize/customer.repository";
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

  it("should update an order", async () => {
    // create customer
    const customerRepository = new CustomerRepository();
    const customer = new Customer("c1", "Customer 1");
    const address = new Address("Street 1", 12, "City", "State", "12345-123");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    // create order
    const productRepository = new ProductRepository()
    const product = new Product("p1", "Product 1", 10);
    await productRepository.create(product);

    // create order item
    const orderItem = new OrderItem(
      "i1",
      product.id,
      product.name,
      product.price,
      2
    );

    // create order
    const orderRepository = new OrderRepository();
    const order = new Order("o1", customer.id, [orderItem]);
    await orderRepository.create(order);

    //create new order
    const newProduct = new Product("p2", "Product 2", 20);
    await productRepository.create(newProduct);

    // create new order item
    const newOrderItem = new OrderItem(
      "i2",
      newProduct.id,
      newProduct.name,
      newProduct.price,
      3
    );

    // update new order item to order
    order.addOrderItem(newOrderItem);
    await orderRepository.update(order);

    // find order on repository
    const orderModel = await OrderModel.findOne({
        where: {id: order.id},
        include: [{model: OrderItemModel}]
    });

    // check if order was updated
    expect(orderModel.toJSON()).toEqual({
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
        },
        {
          id: newOrderItem.id,
          name: newOrderItem.name,
          product_id: newProduct.id,
          order_id: order.id,
          quantity: newOrderItem.quantity,
          price: newOrderItem.price
        }
      ]
    });
  });

  it("should find an order", async () => {
    // create customer
    const customerRepository = new CustomerRepository();
    const customer = new Customer("c1", "Customer 1");
    const address = new Address("Street 1", 12, "City", "State", "12345-123");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    // create order
    const productRepository = new ProductRepository()
    const product = new Product("p1", "Product 1", 10);
    await productRepository.create(product);

    // create order item
    const orderItem = new OrderItem(
      "i1",
      product.id,
      product.name,
      product.price,
      2
    );

    // create order
    const orderRepository = new OrderRepository();
    const order = new Order("o1", customer.id, [orderItem]);
    await orderRepository.create(order);

    // find order on repository
    const foundOrder = await orderRepository.find(order.id);

    // check if order was found
    expect(foundOrder).toEqual(order);
  });

  it("should throw an error when order not found", async () => {
    const orderRepository = new OrderRepository();
    await expect(orderRepository.find("o1")).rejects.toThrow("Order not found");
  });

  it("should find a order item", async () => {
    // create customer
    const customerRepository = new CustomerRepository();
    const customer = new Customer("c1", "Customer 1");
    const address = new Address("Street 1", 12, "City", "State", "12345-123");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    // create order
    const productRepository = new ProductRepository()
    const product = new Product("p1", "Product 1", 10);
    await productRepository.create(product);

    // create order item
    const orderItem = new OrderItem(
      "i1",
      product.id,
      product.name,
      product.price,
      2
    );

    // create order
    const orderRepository = new OrderRepository();
    const order = new Order("o1", customer.id, [orderItem]);
    await orderRepository.create(order);

    // find order on repository
    const foundOrderItem = await orderRepository.findOrderItem(orderItem.id, order.id);

    // check if order was found
    expect(foundOrderItem).toEqual(orderItem);
  })

  it("should throw an error when order item not found", async () => {
    const orderRepository = new OrderRepository();
    await expect(orderRepository.findOrderItem("i1", "o1")).rejects.toThrow("Order item not found");
  });

  it("should find all orders of a specific customer", async () => {
    // create customer
    const customerRepository = new CustomerRepository();
    const customer = new Customer("c1", "Customer 1");
    const address = new Address("Street 1", 12, "City", "State", "12345-123");
    customer.changeAddress(address);
    customer.activate();
    await customerRepository.create(customer);

    // create order
    const productRepository = new ProductRepository()
    const product1 = new Product("p1", "Product 1", 10);
    const product2 = new Product("p2", "Product 2", 20);
    const product3 = new Product("p3", "Product 3", 30);
    await productRepository.create(product1);
    await productRepository.create(product2);
    await productRepository.create(product3);

    // create order item
    const orderItem1 = new OrderItem(
      "i1",
      product1.id,
      product1.name,
      product1.price,
      2
    );
    const orderItem2 = new OrderItem(
      "i2",
      product2.id,
      product2.name,
      product2.price,
      2
    );
    const orderItem3 = new OrderItem(
      "i3",
      product3.id,
      product3.name,
      product3.price,
      2
    );
    const orderItem4 = new OrderItem(
      "i4",
      product2.id,
      product2.name,
      product2.price,
      1
    );

    // create order
    const orderRepository = new OrderRepository();
    const order1 = new Order("o1", customer.id, [orderItem1, orderItem2]);
    const order2 = new Order("o2", customer.id, [orderItem3, orderItem4]);
    await orderRepository.create(order1);
    await orderRepository.create(order2);

    const orders = await orderRepository.findAllCustomerOrders(customer.id);

    expect(orders).toEqual([order1, order2]);
  });

  it("should throw an error when customer has no orders", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("c1", "Customer 1");
    const address = new Address("Street 1", 12, "City", "State", "12345-123");
    customer.changeAddress(address);
    customer.activate();
    await customerRepository.create(customer);

    const orderRepository = new OrderRepository();
    await expect(orderRepository.findAllCustomerOrders(customer.id)).rejects.toThrow("These customer have no orders yet.");
  });

  it("should find all orders", async () => {
    // create customer
    const customerRepository = new CustomerRepository();
    const customer1 = new Customer("c1", "Customer 1");
    const customer2 = new Customer("c2", "Customer 2");
    const address1 = new Address("Street 1", 12, "City", "State", "12345-123");
    const address2 = new Address("Street 2", 22, "City", "State", "12345-456");
    customer1.changeAddress(address1);
    customer1.activate();
    customer2.changeAddress(address2);
    customer2.activate();
    await customerRepository.create(customer1);
    await customerRepository.create(customer2);

    // create order
    const productRepository = new ProductRepository()
    const product1 = new Product("p1", "Product 1", 10);
    const product2 = new Product("p2", "Product 2", 20);
    const product3 = new Product("p3", "Product 3", 30);
    await productRepository.create(product1);
    await productRepository.create(product2);
    await productRepository.create(product3);

    // create order item
    const orderItem1 = new OrderItem(
      "i1",
      product1.id,
      product1.name,
      product1.price,
      2
    );
    const orderItem2 = new OrderItem(
      "i2",
      product2.id,
      product2.name,
      product2.price,
      2
    );
    const orderItem3 = new OrderItem(
      "i3",
      product3.id,
      product3.name,
      product3.price,
      2
    );
    const orderItem4 = new OrderItem(
      "i4",
      product2.id,
      product2.name,
      product2.price,
      1
    );

    // create order
    const orderRepository = new OrderRepository();
    const order1 = new Order("o1", customer1.id, [orderItem1, orderItem2]);
    const order2 = new Order("o2", customer2.id, [orderItem3, orderItem4]);
    await orderRepository.create(order1);
    await orderRepository.create(order2);

    const orders = await orderRepository.findAll();

    expect(orders).toEqual([order1, order2]);
  });

  it("should throw an error when the system has no orders yet", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("c1", "Customer 1");
    const address = new Address("Street 1", 12, "City", "State", "12345-123");
    customer.changeAddress(address);
    customer.activate();
    await customerRepository.create(customer);

    const orderRepository = new OrderRepository();
    await expect(orderRepository.findAll()).rejects.toThrow("There are no orders yet.");
  });

});