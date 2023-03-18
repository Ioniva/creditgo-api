import { DataTypes } from 'sequelize';
import sequelize from '../../infraestructure/database/connection.js';

import State from './state.js';
import RejectionReason from './rejection-reason.js';

const Solicitation = sequelize.define(
  'solicitation',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    idRejectionReason: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'id_rejection_reason'
    },
    idState: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'id_state'
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      field: 'amount'
    },
    paymentDays: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'payment_days'
    },
    applicated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    replied_at: {
      type: DataTypes.DATE,
      allowNull: true
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
    },
    uuid: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    }
  },
  {
    // hook function that will be called before saving
    hooks: {
      beforeCreate: (request) => {
        // only update the updatedAt field if any data actually changed
        if (request.changed()) {
          request.setDataValue('updated_at', new Date());
        }
      }
    }
  }
);

// define the one-to-one relationship between Solicitation and State
Solicitation.belongsTo(State, { foreignKey: 'idState' });
State.hasOne(Solicitation, { foreignKey: 'idState' });

Solicitation.belongsTo(RejectionReason, { foreignKey: 'idRejectionReason' });
RejectionReason.hasOne(Solicitation, { foreignKey: 'idRejectionReason' });

export default Solicitation;
