import { DataTypes } from 'sequelize';
import sequelize from '../../infraestructure/database/connection.js';
import EmployeeType from '../entities/employee_type.js';

const Financial = sequelize.define(
  'financial',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    idEmployeeType: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'id_employee_type'
    },
    netMonthlyIncome: {
      type: DataTypes.DECIMAL(19, 4),
      allowNull: true,
      field: 'net_monthly_income'
    },
    netMonthlyExpense: {
      type: DataTypes.DECIMAL(19, 4),
      allowNull: true,
      field: 'net_monthly_expense'
    },
    additionalIncome: {
      type: DataTypes.DECIMAL(19, 4),
      allowNull: true,
      field: 'additional_income'
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    uuid: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true,
      defaultValue: DataTypes.UUIDV4
    }
  },
  {
    // hook function that will be called before saving
    hooks: {
      beforeCreate: (financialData) => {
        // only update the updatedAt field if any data actually changed
        if (financialData.changed()) {
          financialData.setDataValue('updated_at', new Date());
        }
      }
    }
  }
);

// Define the relationship between the tables EmployeeType and FinancialData
EmployeeType.hasOne(Financial, { foreignKey: 'idEmployeeType' });
Financial.belongsTo(EmployeeType, { foreignKey: 'idEmployeeType', as: 'employeeType' });

export default Financial;
