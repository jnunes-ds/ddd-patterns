import express, {type Express} from "express";
import {Sequelize} from "sequelize-typescript";
import CustomerModel from "@infra/customer/repository/sequelize/customer.model";
import {customerRoute} from "@infra/api/routes/customer.route";
import {productRoute} from "@infra/api/routes/product.route";
import ProductModel from "@infra/product/repository/sequelize/product.model";

export const app: Express = express();
app.use(express.json());
app.use('/api/customers', customerRoute);
app.use('/api/products', productRoute);

export let sequelize: Sequelize;

async function setupDb() {
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: ":memory:",
    logging: false,
  })
  await sequelize.addModels([CustomerModel, ProductModel]);
  await sequelize.sync();
}

setupDb();