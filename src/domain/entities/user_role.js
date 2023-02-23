import { DataTypes } from 'sequelize';
import sequelize from '../../infraestructure/database/connection.js';

import Role from './role.js';
import UserLoginData from './user_login_data.js';

const UserRole = sequelize.define('user_role', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  idUser: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'id_user_login_data'
  },
  idRole: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'id_role'
  }
});

// define associations
UserLoginData.belongsToMany(Role, { through: UserRole, foreignKey: 'idUser' });
Role.belongsToMany(UserLoginData, { through: UserRole, foreignKey: 'idRole' });
UserRole.belongsTo(UserLoginData, { foreignKey: 'idUser' });
UserRole.belongsTo(Role, { foreignKey: 'idRole' });
Role.hasMany(UserRole, { foreignKey: 'idRole' });
UserLoginData.hasMany(UserRole, { foreignKey: 'idUser' });

export default UserRole;
