import { DataTypes } from 'sequelize';
import sequelize from '../../infraestructure/database/connection.js';

const State = sequelize.define(
  'state',
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
    hooks: {
      beforeCreate: (state) => {
        // only update the updatedAt field if any data actually changed
        if (state.changed()) {
          state.setDataValue('updated_at', new Date());
        }
      }
    }
  }
);

export default State;
