import { DataTypes } from 'sequelize';
import sequelize from '../../infraestructure/database/connection.js';
import MeetPlace from './meet_place.js';
import PersonalData from './personal_data.js';

const UserMeetPlace = sequelize.define('user_meet_place', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  idMeetPlace: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  idPersonalData: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

// define associations between tables UserMeetPlace and MeetPlace
UserMeetPlace.belongsTo(MeetPlace, { foreignKey: 'idMeetPlace' });
MeetPlace.hasOne(UserMeetPlace, { foreignKey: 'idMeetPlace' });

// define associations between tables UserMeetPlace and PersonalData
UserMeetPlace.belongsTo(PersonalData, { foreignKey: 'idPersonalData' });
PersonalData.hasOne(UserMeetPlace, { foreignKey: 'idPersonalData' });

export default UserMeetPlace;
