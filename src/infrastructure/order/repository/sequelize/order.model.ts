import {Model, BelongsTo, Column, ForeignKey, PrimaryKey, Table, HasMany} from "sequelize-typescript";
import {DataTypes} from "sequelize";
import CustomerModel from "../../../customer/repository/sequelize/customer.model";
import OrderItemModel from "./order-item.model";

@Table({tableName: "orders", timestamps: false})
export default class OrderModel extends Model {
  @PrimaryKey
  @Column({type: DataTypes.STRING, allowNull: false})
  declare id: string;

  @ForeignKey(() => CustomerModel)
  @Column({type: DataTypes.STRING, allowNull: false})
  declare customer_id: string;

  @BelongsTo(() => CustomerModel)
  declare customer: CustomerModel;

  @HasMany(() => OrderItemModel)
  declare items: OrderItemModel[];

  @Column({type: DataTypes.FLOAT, allowNull: false})
  declare total: number;
}