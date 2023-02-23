import { DataTypes } from 'sequelize';
import sequelize from '../../infraestructure/database/connection.js';
import MaritalStatus from './marital_status.js';

const PersonalData = sequelize.define('personal_data', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  idMaritalStatus: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'id_marital_status'
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
  cedula: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  dispatchDate: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'dispatch_date'
  },
  dispatchPlace: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'dispatch_place'
  },
  birthDate: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'birth_date'
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: false,
    length: 1
  },
  childrenNumber: {
    type: DataTypes.INTEGER,
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
  termCondition: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    field: 'term_condition',
    defaultValue: false
  },
  personalData: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    field: 'personal_data',
    defaultValue: false
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
    allowNull: false,
    defaultValue: DataTypes.UUIDV4
  }
}, {
  timestamps: true,
  // hook function that will be called before saving
  hooks: {
    beforeCreate: (personalData) => {
      // only update the updatedAt field if any data actually changed
      if (personalData.changed()) {
        personalData.setDataValue('updatedAt', new Date());
      }
    }
  }
});

// define the relationship between the tables MaritalStatus and PersonalData
MaritalStatus.hasOne(PersonalData, { foreignKey: 'idMaritalStatus' });
PersonalData.belongsTo(MaritalStatus, { foreignKey: 'idMaritalStatus' });

export default PersonalData;
