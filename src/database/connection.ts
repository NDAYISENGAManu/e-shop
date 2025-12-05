import { Sequelize } from 'sequelize';

const env = process.env.NODE_ENV || 'development';
const config = require('../../config/config.js')[env];

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

let sequelize: Sequelize;

if (config.use_env_variable) {
  const dbUrl = process.env[config.use_env_variable];
  if (!dbUrl) {
    // During build, use a dummy URL to allow models to initialize
    // The actual connection won't be used during build
    sequelize = new Sequelize('postgresql://dummy:dummy@localhost:5432/dummy', {
      ...optimizedConfig,
      pool: { max: 1, min: 0 }, // Minimal pool for build-time
      logging: false,
    });
  } else {
    sequelize = new Sequelize(dbUrl, optimizedConfig);
  }
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    optimizedConfig
  );
}

export default sequelize;
