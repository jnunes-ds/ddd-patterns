import {Model, Column, PrimaryKey, Table} from "sequelize-typescript";

@Table({tableName: "products", timestamps: false})
export default class ProductModel extends  Model {
  @PrimaryKey
  @Column({type: "string", allowNull: false})
  declare id: string;

  @Column({type: "string", allowNull: false})
  declare name: string;

  @Column({type: "number", allowNull: false})
  declare price: number;
}