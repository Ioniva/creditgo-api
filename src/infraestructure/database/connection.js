import { Sequelize } from 'sequelize';
import config from '../../../config/index.js';

const sequelize = new Sequelize(config.DATABASE.NAME, config.DATABASE.USER, config.DATABASE.PASS, {
  modelsDir: config.DATABASE.MODELS_DIR,
  dialect: config.DATABASE.DIALECT,
  database: config.DATABASE.HOST,
  define: {
    // customize pluralization rules
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    pluralize: false // disable pluralization
  }
});

// test the connection
// sequelize
//   .authenticate()
//   .then(() => {
//     console.log("Connection has been established successfully.");
//   })
//   .catch((err) => {
//     console.error("Unable to connect to the database:", err);
//   });

export default sequelize;
