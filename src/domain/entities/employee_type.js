import { DataTypes } from 'sequelize';
import sequelize from '../../infraestructure/database/connection.js';

const EmployeeType = sequelize.define('employee_type', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  code: {
    type: DataTypes.STRING,
    allowNull: false,
    length: 2,
    unique: true
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
    beforeCreate: (employeeType) => {
      // only update the updatedAt field if any data actually changed
      if (employeeType.changed()) {
        employeeType.setDataValue('updatedAt', new Date());
      }
    }
  }
});

export default EmployeeType;
