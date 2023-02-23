import { DataTypes } from 'sequelize';
import sequelize from '../../infraestructure/database/connection.js';

import PersonalData from './personal_data.js';
import UserLoginData from './user_login_data.js';

const UserPersonalData = sequelize.define('user_personal_data', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  idUserLoginData: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'id_user_login_data'
  },
  idPersonalData: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'id_personal_data'
  }
});

// define associations between tables UserPersonalData and PersonalData
UserPersonalData.belongsTo(PersonalData, { foreignKey: 'idPersonalData' });
PersonalData.belongsTo(UserPersonalData, { foreignKey: 'idPersonalData' });
PersonalData.hasOne(UserPersonalData, { foreignKey: 'idPersonalData' });

// define associations between tables UserPersonalData and UserLoginData
UserPersonalData.belongsTo(UserLoginData, { foreignKey: 'idUserLoginData' });
UserLoginData.belongsTo(UserPersonalData, { foreignKey: 'idUserLoginData' });
UserLoginData.hasOne(UserPersonalData, { foreignKey: 'idUserLoginData' });

export default UserPersonalData;
