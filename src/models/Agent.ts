import { Model, DataTypes } from 'sequelize';
import sequelize from '../database';
import Vendor from './Vendor';

export interface IAgent {
    name?: string;
}

class Agent extends Model implements IAgent {
    public id!: number;
    public name!: string;
}

Agent.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true,
    }
}, {
    sequelize,
    modelName: 'Agent',
    tableName: 'agents',
    timestamps: true
});

Agent.belongsTo(Vendor, { foreignKey: 'vendorId' });

export default Agent;
