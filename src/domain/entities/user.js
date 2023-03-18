import { DataTypes } from 'sequelize';
import sequelize from '../../infraestructure/database/connection.js';

import Financial from './financial.js';
import Guarantor from './guarantor.js';
import BankAccount from './bank_account.js';
import LoginData from './login_data.js';
import Solicitation from './solicitation.js';
import UserSolicitation from './user_solicitation.js';

const User = sequelize.define(
  'user',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      field: 'id'
    },
    idGuarantor: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Guarantor,
        key: 'id'
      }
    },
    idFinancial: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Financial,
        key: 'id'
      }
    },
    idBankAccount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: BankAccount,
        key: 'id'
      }
    },
    idLoginData: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: LoginData,
        key: 'id'
      }
      // field: "id_login_data",
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    surname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
      length: 15
    },
    cedula: {
      type: DataTypes.STRING,
      allowNull: true,
      length: 13
    },
    dispatchDate: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'dispatch_date'
    },
    dispatchPlace: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'dispatch_place'
    },
    birthDate: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'birth_date'
    },
    genre: {
      type: DataTypes.STRING,
      allowNull: false,
      length: 1
    },
    children: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    department: {
      type: DataTypes.STRING,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    zip: {
      type: DataTypes.STRING,
      allowNull: false,
      length: 12
    },
    maritalStatus: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'marital_status'
    },
    meetPlace: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'meet_place'
    },
    // acceptedTerms: {
    //   type: DataTypes.BOOLEAN,
    //   allowNull: false,
    //   field: "accepted_terms",
    //   defaultValue: false,
    // },
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
      beforeCreate: (user) => {
        // only hash the password if it has been modified (or is new)
        if (user.changed()) {
          user.setDataValue('updated_at', new Date());
        }
      }
    }
  }
);

User.belongsTo(LoginData, { foreignKey: 'idLoginData', onDelete: 'CASCADE' });
LoginData.hasOne(User, { foreignKey: 'idLoginData', onDelete: 'CASCADE' });

User.hasOne(Guarantor, { foreignKey: 'idGuarantor', onDelete: 'CASCADE' });
Guarantor.belongsTo(User, { foreignKey: 'idGuarantor', onDelete: 'CASCADE' });

User.hasOne(Financial, { foreignKey: 'idFinancial', onDelete: 'CASCADE' });
Financial.belongsTo(User, { foreignKey: 'idFinancial', onDelete: 'CASCADE' });

User.hasOne(BankAccount, { foreignKey: 'idBankAccount', onDelete: 'CASCADE' });
BankAccount.belongsTo(User, { foreignKey: 'idBankAccount', onDelete: 'CASCADE' });

User.belongsToMany(Solicitation, {
  through: UserSolicitation,
  foreignKey: 'idUser',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});
Solicitation.belongsToMany(User, {
  through: UserSolicitation,
  foreignKey: 'idSolicitation',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});

export default User;
