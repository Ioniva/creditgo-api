import { DataTypes } from 'sequelize';
import sequelize from '../../infraestructure/database/connection.js';

const Role = sequelize.define('role', {
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
    unique: true,
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
    allowNull: true,
    field: 'updated_at'
  }
}, {
  timestamps: true,
  // hook function that will be called before saving
  hooks: {
    beforeCreate: (role) => {
      // only update the updatedAt field if any data actually changed
      if (role.changed()) {
        role.setDataValue('updatedAt', new Date());
      }
    }
  }
});

export default Role;
