import { DataTypes } from 'sequelize';
import sequelize from '../../infraestructure/database/connection.js';

import Valoration from './valoration.js';
import State from './state.js';

const Solicitation = sequelize.define('solicitation', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  idValoration: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'id_valoration'
  },
  idState: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'id_state'
  },
  applicationDate: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'application_date',
    defaultValue: DataTypes.NOW
  },
  responseDate: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'response_date'
  },
  rejectionReason: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'rejection_reason'
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
    beforeCreate: (request) => {
      // only update the updatedAt field if any data actually changed
      if (request.changed()) {
        request.setDataValue('updatedAt', new Date());
      }
    }
  }
});

// define the one-to-one relationship between Solicitation and Valoration
Valoration.hasOne(Solicitation, { foreignKey: 'idValoration' });
Solicitation.belongsTo(Valoration, { foreignKey: 'idValoration' });

// define the one-to-one relationship between Solicitation and State
State.hasOne(Solicitation, { foreignKey: 'idState' });
Solicitation.belongsTo(State, { foreignKey: 'idState' });

export default Solicitation;
