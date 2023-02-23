import { DataTypes } from 'sequelize';
import sequelize from '../../infraestructure/database/connection.js';
import FinancialData from './financial_data.js';
import PersonalData from './personal_data.js';

const UserFinancialData = sequelize.define('user_financial_data', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  idPersonalData: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'id_personal_data'
  },
  idFinancialData: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'id_financial_data'
  }
});

// define associations between tables UserFinancialData and PersonalData
UserFinancialData.belongsTo(PersonalData, { foreignKey: 'idPersonalData' });
PersonalData.hasOne(UserFinancialData, { foreignKey: 'idPersonalData' });

// define associations between tables UserFinancialData and FinancialData
UserFinancialData.belongsTo(FinancialData, { foreignKey: 'idFinancialData' });
FinancialData.hasOne(UserFinancialData, { foreignKey: 'idFinancialData' });

export default UserFinancialData;
