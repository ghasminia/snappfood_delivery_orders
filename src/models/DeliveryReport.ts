import { Model, DataTypes } from 'sequelize';
import sequelize from '../database';
import Order from "./Order";
import Vendor from './Vendor';
import Agent from './Agent';
import { DeliveryReportStatus } from '../interfaces/enum';
import Utils from '../services/Utils';

export interface IDeliveryReport {
    id?: number;
    orderId?: number;
    agentId?: number;
    vendorId?: number;
    status?: DeliveryReportStatus;
    tripRecord?: boolean;
}

class DeliveryReport extends Model implements IDeliveryReport {
    public id?: number;
    public orderId?: number;
    public agentId?: number | undefined;
    public vendorId?: number;
    public status?: DeliveryReportStatus;
    public tripRecord?: boolean;
}

DeliveryReport.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    orderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    agentId: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    vendorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM(...Utils.getInstance().enumToValues(DeliveryReportStatus)),
        defaultValue: DeliveryReportStatus.DELAY,
        allowNull: false,
    },
    tripRecord: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
    }
}, {
    sequelize,
    modelName: 'DeliveryReport',
    tableName: 'delivery_reports',
    timestamps: true
});

DeliveryReport.belongsTo(Order, { foreignKey: 'orderId' });
DeliveryReport.belongsTo(Vendor, { foreignKey: 'vendorId' });
DeliveryReport.belongsTo(Agent, { foreignKey: 'agentId' });

export default DeliveryReport;
