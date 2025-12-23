import { Sequelize } from 'sequelize';
import { config } from '../config';

// ============================================
// SEQUELIZE DATABASE CONNECTION
// ALL VALUES FROM ENVIRONMENT VARIABLES
// ============================================

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: config.database.host,
  port: config.database.port,
  database: config.database.database,
  username: config.database.username,
  password: config.database.password,
  pool: {
    max: config.database.pool.max,
    min: config.database.pool.min,
    acquire: config.database.pool.acquire,
    idle: config.database.pool.idle,
  },
  logging: config.nodeEnv === 'development' ? console.log : false,
});

export default sequelize;
