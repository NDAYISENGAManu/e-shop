import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../connection';
import { Settings as SettingsType } from '@/types';

interface SettingsCreationAttributes extends Optional<SettingsType, 'id' | 'createdAt' | 'updatedAt'> { }

class Settings extends Model<SettingsType, SettingsCreationAttributes> implements SettingsType {
    declare public id: number;
    declare public storeName: string;
    declare public email: string;
    declare public phone: string;
    declare public shippingFee: number;
    declare public freeShippingThreshold: number;
    declare public taxRate: number;
    declare public readonly createdAt: Date;
    declare public readonly updatedAt: Date;
}

Settings.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        storeName: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'E-Shop',
            field: 'store_name',
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'admin@eshop.com',
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: '+1234567890',
        },
        shippingFee: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            defaultValue: 5.00,
            field: 'shipping_fee',
        },
        freeShippingThreshold: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            defaultValue: 50.00,
            field: 'free_shipping_threshold',
        },
        taxRate: {
            type: DataTypes.DECIMAL(5, 2),
            allowNull: false,
            defaultValue: 8.50,
            field: 'tax_rate',
        },
        createdAt: {
            type: DataTypes.DATE,
            field: 'created_at',
        },
        updatedAt: {
            type: DataTypes.DATE,
            field: 'updated_at',
        },
    },
    {
        sequelize,
        tableName: 'settings',
        modelName: 'Settings',
        underscored: true,
    }
);

export default Settings;
