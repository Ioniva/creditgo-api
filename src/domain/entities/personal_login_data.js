import { DataTypes } from 'sequelize';
import sequelize from '../../infraestructure/database/connection.js';

import PersonalData from './personal_data.js';
import LoginData from './login_data.js';

const PersonalLoginData = sequelize.define('personal_login_data', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  idLoginData: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'id_login_data'
  },
  idPersonalData: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'id_personal_data'
  }
});

// define associations between tables UserPersonalData and PersonalData
PersonalLoginData.belongsTo(PersonalData, { foreignKey: 'idPersonalData' });
PersonalData.hasOne(PersonalLoginData, { foreignKey: 'idPersonalData' });

// define associations between tables UserPersonalData and UserLoginData
PersonalLoginData.belongsTo(LoginData, { foreignKey: 'idLoginData' });
LoginData.hasOne(PersonalLoginData, { foreignKey: 'idLoginData' });

export default PersonalLoginData;
