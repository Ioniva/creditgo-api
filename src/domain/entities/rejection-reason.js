import { DataTypes } from 'sequelize';
import sequelize from '../../infraestructure/database/connection.js';

const RejectionReason = sequelize.define(
  'rejection_reason',
  {
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
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  },
  {
    // hook function that will be called before saving
    hooks: {
      beforeCreate: (valoration) => {
        // only update the updatedAt field if any data actually changed
        if (valoration.changed()) {
          valoration.setDataValue('updated_at', new Date());
        }
      }
    }
  }
);

export default RejectionReason;
