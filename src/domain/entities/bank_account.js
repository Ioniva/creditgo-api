import { DataTypes } from 'sequelize';
import sequelize from '../../infraestructure/database/connection.js';
import BankType from './bank_type.js';
import BankName from './bank_name.js';

const BankAccount = sequelize.define(
  'bank_account',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      field: 'id'
    },
    idBankName: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'id_bank_name'
    },
    idBankType: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'id_bank_type'
    },
    number: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    holder: {
      type: DataTypes.STRING,
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true
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
      beforeCreate: (bankAccount) => {
        // only update the updatedAt field if any data actually changed
        if (bankAccount.changed()) {
          bankAccount.setDataValue('updated_at', new Date());
        }
      }
    }
  }
);

// define the one-to-one relationship between BankAccount and BankType
// BankType.hasOne(BankAccount, { foreignKey: "idBankType" });
// BankAccount.belongsTo(BankType, { foreignKey: "idBankType" });

// define the one-to-one relationship between BankAccount and BankName
// BankName.hasOne(BankAccount, { foreignKey: "idBankName" });
// BankAccount.belongsTo(BankName, { foreignKey: "idBankName" });

// Define one-to-one relationship between BankAccount and BankName
BankAccount.belongsTo(BankName, { foreignKey: 'idBankName' });
BankName.hasOne(BankAccount, { foreignKey: 'idBankName' });

// Define one-to-one relationship between BankAccount and BankType
BankAccount.belongsTo(BankType, { foreignKey: 'idBankType' });
BankType.hasOne(BankAccount, { foreignKey: 'idBankType' });

export default BankAccount;
