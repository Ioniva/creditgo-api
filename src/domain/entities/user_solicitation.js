import { DataTypes } from 'sequelize';
import sequelize from '../../infraestructure/database/connection.js';
import Solicitation from './solicitation.js';
import PersonalData from './personal_data.js';

const UserSolicitation = sequelize.define('user_solicitation', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  idSolicitation: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'id_solicitation'
  },
  idPersonalData: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'id_personal_data'
  }
});

// define associations between tables UserSolicitation and PersonalData
UserSolicitation.belongsTo(PersonalData, { foreignKey: 'idPersonalData' });
PersonalData.belongsTo(UserSolicitation, { foreignKey: 'idPersonalData' });
PersonalData.hasOne(UserSolicitation, { foreignKey: 'idPersonalData' });

// define associations between tables UserSolicitation and Solicitation
UserSolicitation.belongsTo(Solicitation, { foreignKey: 'idSolicitation' });
Solicitation.belongsTo(UserSolicitation, { foreignKey: 'idSolicitation' });
Solicitation.hasOne(UserSolicitation, { foreignKey: 'idSolicitation' });

export default UserSolicitation;
