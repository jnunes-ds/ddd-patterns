import {Model, Column, PrimaryKey, Table} from "sequelize-typescript";
import {DataTypes} from "sequelize";

@Table({tableName: "customer", timestamps: false})
export default class CustomerModel extends Model {
  @PrimaryKey
  @Column({type: DataTypes.STRING, allowNull: false})
  declare id: string;

  @Column({type: DataTypes.STRING, allowNull: false})
  declare name: string;

  @Column({type: DataTypes.BOOLEAN, allowNull: false})
  declare active: boolean;

  @Column({type: DataTypes.INTEGER, allowNull: false})
  declare rewardPoints: number;

  @Column(DataTypes.STRING)
  declare street: string;

  @Column(DataTypes.INTEGER)
  declare number: number;

  @Column(DataTypes.STRING)
  declare city: string;

  @Column(DataTypes.STRING)
  declare state: string;

  @Column(DataTypes.STRING)
  declare zipCode: string;
}