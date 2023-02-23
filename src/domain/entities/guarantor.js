import { DataTypes } from 'sequelize';
import sequelize from '../../infraestructure/database/connection.js';
import EmployeeType from './employee_type.js';

const Guarantor = sequelize.define('guarantor', {
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
  cedula: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  surname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
    length: 15
  },
  dispatchDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  dispatchPlace: {
    type: DataTypes.STRING,
    allowNull: false
  },
  department: {
    type: DataTypes.STRING,
    allowNull: false
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false
  },
  zip: {
    type: DataTypes.STRING,
    allowNull: false,
    length: 12
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
  },
  uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    unique: true
  }
}, {
  timestamps: true,
  // hook function that will be called before saving
  hooks: {
    beforeCreate: (guarantor) => {
      // only update the updatedAt field if any data actually changed
      if (guarantor.changed()) {
        guarantor.setDataValue('updatedAt', new Date());
      }
    }
  }
});

// define the relationship between the tables EmployeeType and Guarantor
EmployeeType.hasOne(Guarantor, { foreignKey: 'idEmployeeType' });
Guarantor.belongsTo(EmployeeType, { foreignKey: 'idEmployeeType' });

export default Guarantor;
