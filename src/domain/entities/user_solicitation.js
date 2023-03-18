import { DataTypes } from 'sequelize';
import sequelize from '../../infraestructure/database/connection.js';

const UserSolicitation = sequelize.define('user_solicitation', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  idUser: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'id_user'
  },
  idSolicitation: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'id_solicitation'
  }
});

// define associations between tables UserSolicitation and PersonalData
// UserSolicitation.belongsTo(PersonalData, { foreignKey: 'idPersonalData' });
// PersonalData.belongsTo(UserSolicitation, { foreignKey: 'idPersonalData' });
// PersonalData.hasOne(UserSolicitation, { foreignKey: 'idPersonalData' });

// define associations between tables UserSolicitation and Solicitation
// UserSolicitation.belongsTo(Solicitation, { foreignKey: 'idSolicitation' });
// Solicitation.belongsTo(UserSolicitation, { foreignKey: 'idSolicitation' });
// Solicitation.hasOne(UserSolicitation, { foreignKey: 'idSolicitation' });

export default UserSolicitation;
