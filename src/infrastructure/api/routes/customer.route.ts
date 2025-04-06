import express from "express";
import CreateCustomerUseCase from "../../../usecase/customer/create/create.customer.usecase";
import CustomerRepository from "@infra/customer/repository/sequelize/customer.repository";
import {InputCreateCustomerDTO} from "../../../usecase/customer/create/create.customer.dto";

export const customerRoute = express.Router();

customerRoute.post("/", async (req, res) => {
  const usecase = new CreateCustomerUseCase(new CustomerRepository());
  try {
    const customerDto: InputCreateCustomerDTO = {
      name: req.body.name,
      address: {
        street: req.body.address.street,
        number: req.body.address.number,
        city: req.body.address.city,
        state: req.body.address.state,
        zipCode: req.body.address.zipCode
      }
    }

    const output = await usecase.execute(customerDto);
    res.status(200).send(output);
  } catch (error) {
    res.status(500).send(error);
  }
});