import express from "express";
import CreateProductUsecase from "@usecase/product/create/create.product.usecase";
import ProductRepository from "@infra/product/repository/sequelize/product.repository";
import {InputCreateProductDTO} from "@usecase/product/create/create.product.dto";
import ListProductUsecase from "@usecase/product/list/list.product.usecase";

export const productRoute = express.Router();

productRoute.post("/", async (req, res) => {
  const usecase = new CreateProductUsecase(new ProductRepository());
  try {
    const productDto: InputCreateProductDTO = {
      name: req.body.name,
      price: req.body.price,
    };

    const output = await usecase.execute(productDto);
    res.status(200).send(output);
  } catch (error) {
    res.status(500).send(error);
  }
});

productRoute.get("/", async (req, res) => {
  const usecase = new ListProductUsecase(new ProductRepository());
  try {
    const output = await usecase.execute({});
    res.status(200).send(output);
  } catch (error) {
    res.status(500).send(error);
  }
});