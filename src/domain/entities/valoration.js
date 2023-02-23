import { DataTypes } from 'sequelize';
import sequelize from '../../infraestructure/database/connection.js';

const Valoration = sequelize.define('valoration', {
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
    length: 1
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
    beforeCreate: (valoration) => {
      // only update the updatedAt field if any data actually changed
      if (valoration.changed()) {
        valoration.setDataValue('updatedAt', new Date());
      }
    }
  }
});

export default Valoration;