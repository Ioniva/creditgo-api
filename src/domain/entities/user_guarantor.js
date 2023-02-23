import { DataTypes } from 'sequelize';
import sequelize from '../../infraestructure/database/connection.js';
import PersonalData from './personal_data.js';
import Guarantor from './guarantor.js';

const UserGuarantor = sequelize.define('user_guarantor', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  idPersonalData: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  idGuarantor: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

// define associations between tables UserGuarantor and PersonalData
UserGuarantor.belongsTo(PersonalData, { foreignKey: 'idPersonalData' });
PersonalData.hasOne(UserGuarantor, { foreignKey: 'idPersonalData' });

// define associations between tables UserGuarantor and Guarantor
UserGuarantor.belongsTo(Guarantor, { foreignKey: 'idGuarantor' });
Guarantor.hasOne(UserGuarantor, { foreignKey: 'idGuarantor' });

export default UserGuarantor;
