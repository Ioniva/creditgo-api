import { DataTypes } from 'sequelize';
import sequelize from '../../infraestructure/database/connection.js';

import PersonalData from './personal_data.js';
import BankAccount from './bank_account.js';

const UserBankAccount = sequelize.define('user_bank_account', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  idBankAccount: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'id_bank_account'
  },
  idPersonalData: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'id_personal_data'
  }
});

// define associations between tables UserBankAccount and PersonalData
UserBankAccount.belongsTo(PersonalData, { foreignKey: 'idPersonalData' });
PersonalData.belongsTo(UserBankAccount, { foreignKey: 'idPersonalData' });
PersonalData.hasOne(UserBankAccount, { foreignKey: 'idPersonalData' });

// define associations between tables UserBankAccount and BankAccount
UserBankAccount.belongsTo(BankAccount, { foreignKey: 'idBankAccount' });
BankAccount.belongsTo(UserBankAccount, { foreignKey: 'idBankAccount' });
BankAccount.hasOne(UserBankAccount, { foreignKey: 'idBankAccount' });

export default UserBankAccount;
