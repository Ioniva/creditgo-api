import { DataTypes } from 'sequelize';
import sequelize from '../../infraestructure/database/connection.js';
import EmployeeType from './employee_type.js';

const FinancialData = sequelize.define('financial_data', {
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
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
    field: 'created_at'
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
    field: 'updated_at'
  }
}, {
  timestamps: true,
  // hook function that will be called before saving
  hooks: {
    beforeCreate: (financialData) => {
      // only update the updatedAt field if any data actually changed
      if (financialData.changed()) {
        financialData.setDataValue('updatedAt', new Date());
      }
    }
  }
});

// Define the relationship between the tables EmployeeType and FinancialData
EmployeeType.hasOne(FinancialData, { foreignKey: 'idEmployeeType' });
FinancialData.belongsTo(EmployeeType, { foreignKey: 'idEmployeeType' });

export default FinancialData;
