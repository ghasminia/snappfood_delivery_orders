import { Model, DataTypes, InferAttributes, InferCreationAttributes } from 'sequelize';
import sequelize from '../database';
import Vendor from "./Vendor";

export interface IOrder {
    name?: string;
    description?: string;
    delivery_time?: Date;
}

class Order extends Model implements IOrder {
  id!: number;
  name!: string;
  description!: string;
  delivery_time!: Date;
}

Order.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    delivery_time: {
        type: DataTypes.DATE,
        allowNull: true,
    }
}, {
    sequelize,
    modelName: 'Order',
    tableName: 'orders',
    timestamps: true
});

Order.belongsTo(Vendor, { foreignKey: 'vendorId' });

export default Order;
