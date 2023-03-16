import { DataTypes } from 'sequelize';
import sequelize from '../../infraestructure/database/connection.js';
import Role from './role.js';
import LoginDataRole from './login_data_role.js';

const LoginData = sequelize.define(
  'login_data',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
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
      unique: true,
      defaultValue: DataTypes.UUIDV4
    }
  },
  {
    // hook function that will be called before saving
    hooks: {
      beforeCreate: (loginData) => {
        // only hash the password if it has been modified (or is new)
        if (loginData.changed()) {
          loginData.setDataValue('updated_at', new Date());
        }
      }
    }
  }
);

LoginData.belongsToMany(Role, {
  through: LoginDataRole,
  foreignKey: 'idLoginData',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});
Role.belongsToMany(LoginData, {
  through: LoginDataRole,
  foreignKey: 'idRole',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});

export default LoginData;
