import { Sequelize } from 'sequelize';
import * as pg from 'pg';

const env = process.env.NODE_ENV || 'development';
const isProduction = env === 'production';

// Attempt to load config for development
let config: any = {};
try {
  config = require('../../config/config.js')[env];
} catch (e) {
  if (!isProduction) console.warn("Could not load config.js:", e);
}

// Define specific interface for the global object to hold sequelize
declare global {
  var sequelize: Sequelize | undefined;
}

let sequelize: Sequelize;

const commonOptions = {
  dialect: 'postgres' as const,
  dialectModule: pg,
  logging: console.log, // Enable logging in production to debug 500 errors
  benchmark: true,
};

// Singleton pattern to prevent multiple connections in serverless/dev
if (global.sequelize) {
  sequelize = global.sequelize;
} else {
  // Check for DATABASE_URL (Production or configured Dev)
  if (process.env.DATABASE_URL) {
    sequelize = new Sequelize(process.env.DATABASE_URL, {
      ...commonOptions,
      pool: {
        max: 5,
        min: 0,
        acquire: 60000,
        idle: 10000,
      },
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
    });
  } else if (config && config.database) {
    // Development fallback
    sequelize = new Sequelize(
      config.database,
      config.username,
      config.password,
      {
        ...commonOptions,
        host: config.host,
        port: config.port,
        pool: {
          max: 5,
          min: 0,
          acquire: 60000,
          idle: 10000,
        },
      }
    );
  } else {
    // Build-time fallback
    console.log("No valid database configuration found, using dummy connection for build.");
    sequelize = new Sequelize('postgresql://dummy:dummy@localhost:5432/dummy', {
      ...commonOptions,
      pool: { max: 1, min: 0 },
      logging: false,
    });
  }

  // Save instance to global to be reused
  global.sequelize = sequelize;
}

// Test connection attempt (non-blocking)
if (!isProduction) {
  sequelize.authenticate()
    .then(() => console.log('Database connection has been established successfully.'))
    .catch(err => console.error('Unable to connect to the database:', err));
}

export default sequelize;
