import { Model, DataTypes } from 'sequelize';
import sequelize from '../database';
import Order from "./Order"
import { TripStatus } from "../interfaces/enum"
import Utils from '../services/Utils';

export interface ITrip {
  status?: TripStatus;
  orderId?: Order;
}

class Trip extends Model implements ITrip {
  public id!: number;
  public status!: TripStatus;
  public orderId!: Order;

}

Trip.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    status: {
      type: DataTypes.ENUM(...Utils.getInstance().enumToValues(TripStatus)),
      allowNull: false,
    },
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  },
  {
    sequelize,
    modelName: 'Trip',
    tableName: 'trips',
    timestamps: true
  }
);

export default Trip;
