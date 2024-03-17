import { Model, DataTypes } from 'sequelize';
import sequelize from '../database';

export interface IVendor {
  name?: string;
}

class Vendor extends Model implements IVendor {
  public id!: number;
  public name!: string;
}

Vendor.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: "Vendor",
    tableName: "vendors",
    timestamps: true
  }
);

export default Vendor;
