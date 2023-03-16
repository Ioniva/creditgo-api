import { DataTypes } from 'sequelize';
import sequelize from '../../infraestructure/database/connection.js';

const LoginDataRole = sequelize.define('login_data_role', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  idLoginData: {
    type: DataTypes.INTEGER,
    // references: {
    //   model: LoginData,
    //   key: "id",
    // },
    allowNull: false,
    field: 'id_login_data'
  },
  idRole: {
    type: DataTypes.INTEGER,
    // references: {
    //   model: Role,
    //   key: "id",
    // },
    allowNull: false,
    field: 'id_role'
  }
});

// Define the many-to-many relationship between LoginData and Role
// LoginData.belongsToMany(Role, { through: LoginDataRole, foreignKey: "idLoginData", onDelete: "CASCADE" });
// Role.belongsToMany(LoginData, { through: LoginDataRole, foreignKey: "idRole", onDelete: "CASCADE" });

export default LoginDataRole;
