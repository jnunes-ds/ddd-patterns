import {Model, BelongsTo, Column, ForeignKey, PrimaryKey, Table} from "sequelize-typescript";
import {DataTypes} from "sequelize";
import ProductModel from "./product.model";
import OrderModel from "./order.model";

@Table({tableName: "order-items", timestamps: false})
export default class OrderItemModel extends Model {
  @PrimaryKey
  @Column({type: DataTypes.STRING, allowNull: false})
  declare id: string;

  @ForeignKey(() => ProductModel)
  @Column({type: DataTypes.STRING, allowNull: false})
  declare product_id: string;

  @BelongsTo(() => ProductModel)
  declare product: ProductModel;

  @ForeignKey(() => OrderModel)
  @Column({type: DataTypes.STRING, allowNull: false})
  declare order_id: string;

  @BelongsTo(() => OrderModel)
  declare order: OrderModel;

  @Column({type: DataTypes.INTEGER, allowNull: false})
  declare quantity: number;

  @Column({type: DataTypes.FLOAT, allowNull: false})
  declare price: number;
}