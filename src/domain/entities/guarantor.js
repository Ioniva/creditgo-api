import { DataTypes } from 'sequelize';
import sequelize from '../../infraestructure/database/connection.js';
import EmployeeType from './employee_type.js';

const Guarantor = sequelize.define(
  'guarantor',
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
      allowNull: false,
      field: 'dispatch_date'
    },
    dispatchPlace: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'dispatch_place'
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
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true
    }
  },
  {
    // hook function that will be called before saving
    hooks: {
      beforeCreate: (guarantor) => {
        // only update the updatedAt field if any data actually changed
        if (guarantor.changed()) {
          guarantor.setDataValue('updated_at', new Date());
        }
      }
    }
  }
);

// define the relationship between the tables EmployeeType and Guarantor
// Guarantor.hasOne(EmployeeType, { foreignKey: "id" });
// EmployeeType.belongsTo(Guarantor, { foreignKey: "idEmployeeType" });
EmployeeType.hasOne(Guarantor, { foreignKey: 'idEmployeeType' });
Guarantor.belongsTo(EmployeeType, { foreignKey: 'idEmployeeType' });
// define the relationship between the tables Guarantor and User
Guarantor.associations = (models) => {
  Guarantor.belongsTo(models.User);
};

export default Guarantor;
