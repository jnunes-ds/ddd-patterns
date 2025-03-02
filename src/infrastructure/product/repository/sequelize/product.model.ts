import {Model, Column, PrimaryKey, Table} from "sequelize-typescript";
import {DataTypes} from "sequelize";

@Table({tableName: "products", timestamps: false})
export default class ProductModel extends  Model {
  @PrimaryKey
  @Column({type: DataTypes.STRING, allowNull: false})
  declare id: string;

  @Column({type: DataTypes.STRING, allowNull: false})
  declare name: string;

  @Column({type: DataTypes.FLOAT, allowNull: false})
  declare price: number;
}