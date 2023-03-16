import { DataTypes } from 'sequelize';
import sequelize from '../../infraestructure/database/connection.js';

const BankName = sequelize.define(
  'bank_name',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
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
      allowNull: true,
      field: 'updated_at'
    }
  },
  {
    timestamps: true,
    // hook function that will be called before saving
    hooks: {
      beforeCreate: (bankName) => {
        // only update the updatedAt field if any data actually changed
        if (bankName.changed()) {
          bankName.setDataValue('updatedAt', new Date());
        }
      }
    }
  }
);

export default BankName;
