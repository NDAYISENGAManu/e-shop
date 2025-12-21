import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../connection';
import { User as UserType } from '@/types';

interface UserAttributes extends UserType {
  password: string;
  mustChangePassword?: boolean;
  securityQuestion1?: string;
  securityAnswer1?: string;
  securityQuestion2?: string;
  securityAnswer2?: string;
  dateOfBirth?: Date;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'role' | 'createdAt' | 'updatedAt'> { }

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  declare public id: number;
  declare public email: string;
  declare public password: string;
  declare public firstName: string;
  declare public lastName: string;
  declare public role: 'user' | 'admin';
  declare public mustChangePassword?: boolean;
  declare public securityQuestion1?: string;
  declare public securityAnswer1?: string;
  declare public securityQuestion2?: string;
  declare public securityAnswer2?: string;
  declare public dateOfBirth?: Date;
  declare public readonly createdAt: Date;
  declare public readonly updatedAt: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'first_name',
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'last_name',
    },
    role: {
      type: DataTypes.ENUM('user', 'admin'),
      defaultValue: 'user',
      allowNull: false,
    },
    mustChangePassword: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
      field: 'must_change_password',
    },
    securityQuestion1: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'security_question_1',
    },
    securityAnswer1: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'security_answer_1',
    },
    securityQuestion2: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'security_question_2',
    },
    securityAnswer2: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'security_answer_2',
    },
    dateOfBirth: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      field: 'date_of_birth',
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
    tableName: 'users',
    modelName: 'User',
    underscored: true,
  }
);

export default User;
