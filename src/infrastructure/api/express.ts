import 'module-alias/register';
import express, {type Express} from "express";
import {Sequelize} from "sequelize-typescript";
import CustomerModel from "@infra/customer/repository/sequelize/customer.model";
import {customerRoute} from "@infra/api/routes/customer.route";

export const app: Express = express();
app.use(express.json());
app.use('/api/customers', customerRoute);

export let sequelize: Sequelize;

async function setupDb() {
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: ":memory:",
    logging: false,
  })
  await sequelize.addModels([CustomerModel]);
  await sequelize.sync();
}

setupDb();