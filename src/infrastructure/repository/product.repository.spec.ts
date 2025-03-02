import {Sequelize} from "sequelize-typescript";
import ProductModel from "@infra/db/sequelize/model/product.model";
import Product from "@domain/product/entity/product";
import ProductRepository from "./product.repository";

describe("Product Repository Unit tests", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: {force: true},
    });

    sequelize.addModels([ProductModel]);

    await sequelize.sync();
  });

  afterEach(async() => {
    if (sequelize) await sequelize.close();
  });

  it("should create a product", async () => {
    const productRepository = new ProductRepository();
    const product = new Product("id123", "Product 1", 10);

    await productRepository.create(product);

    const productModel = await ProductModel
      .findOne({where: {id: "id123"}});

    expect(productModel.toJSON()).toStrictEqual({
      id: "id123",
      name: "Product 1",
      price: 10
    });
  });

  it("should update a product", async () => {
    const productId = "id123";

    const productRepository = new ProductRepository();
    const product = new Product(productId, "Product 1", 10);

    await productRepository.create(product);

    const productModel = await ProductModel.findOne({where: {id: productId}});

    expect(productModel.toJSON()).toStrictEqual({
      id: productId,
      name: "Product 1",
      price: 10
    });

    product.changeName("Product 2");
    product.changePrice(20);

    await productRepository.update(product);

    const productModel2 = await ProductModel.findOne({where: {id: productId}});

    expect(productModel2.toJSON()).toStrictEqual({
      id: productId,
      name: "Product 2",
      price: 20
    });
  });

  it("should find a product", async () => {
    const productId = "id123";

    const productRepository = new ProductRepository();
    const product = new Product(productId, "Product 1", 10);

    await productRepository.create(product);

    const productModel = await ProductModel.findOne({where: {id: productId}});

    const foundProduct = await productRepository.find(productId);

    expect(productModel.toJSON()).toStrictEqual({
      id: foundProduct.id,
      name: foundProduct.name,
      price: foundProduct.price
    });
  });

  it("should find all products", async () => {
    const productRepository = new ProductRepository();
    const product1 = new Product("id123", "Product 1", 10);
    const product2 = new Product("id124", "Product 2", 20);

    await productRepository.create(product1);
    await productRepository.create(product2);

    const foundProducts = await productRepository.findAll();
    const products = [product1, product2];

    expect(products).toEqual(foundProducts);
  });
});