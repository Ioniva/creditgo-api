import { DataTypes } from 'sequelize';
import sequelize from '../../infraestructure/database/connection.js';

import User from './user.js';
import Role from './role.js';

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
User.belongsToMany(Role, { through: UserRole, foreignKey: 'idUser' });
Role.belongsToMany(User, { through: UserRole, foreignKey: 'idRole' });
UserRole.belongsTo(User, { foreignKey: 'idUser' });
UserRole.belongsTo(Role, { foreignKey: 'idRole' });
Role.hasMany(UserRole, { foreignKey: 'idRole' });
User.hasMany(UserRole, { foreignKey: 'idUser' });

export default UserRole;
