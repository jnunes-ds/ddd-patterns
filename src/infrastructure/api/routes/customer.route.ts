import express from "express";
import CustomerRepository from "@infra/customer/repository/sequelize/customer.repository";
import CreateCustomerUseCase from "@usecase/customer/create/create.customer.usecase";
import {InputCreateCustomerDTO} from "@usecase/customer/create/create.customer.dto";
import ListCustomerUsecase from "@usecase/customer/list/list.customer.usecase";

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

customerRoute.get("/", async (req, res) => {
  const usecase = new ListCustomerUsecase(new CustomerRepository());
  try {
    const output = await usecase.execute({});
    res.status(200).send(output);
  } catch (error) {
    res.status(500).send(error);
  }
});