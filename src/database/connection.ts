import { Sequelize } from 'sequelize';

const env = process.env.NODE_ENV || 'development';
const config = require('../../config/config.js')[env];

let sequelize: Sequelize;

// Enhanced configuration for production
const optimizedConfig = {
  ...config,
  // Disable SQL logging in production for better performance
  logging: env === 'development' ? console.log : false,
  // Optimize connection pool
  pool: {
    max: env === 'production' ? 20 : 5, // Maximum connections
    min: env === 'production' ? 5 : 1, // Minimum connections
    acquire: 60000, // Maximum time (ms) to get connection
    idle: 10000, // Maximum time (ms) connection can be idle
  },
  // Enable query timeout
  dialectOptions: {
    ...(config.dialectOptions || {}),
    statement_timeout: 30000, // 30 seconds
  },
};

if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable]!, optimizedConfig);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    optimizedConfig
  );
}

export default sequelize;
