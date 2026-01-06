import { Sequelize } from 'sequelize';
import pg from 'pg';

const env = process.env.NODE_ENV || 'development';
const isProduction = env === 'production';

// Attempt to load config for development, but don't hard crash if missing in prod
let config: any = {};
try {
  config = require('../../config/config.js')[env];
} catch (e) {
  // In production we might rely solely on env vars, so this is fine
  if (!isProduction) console.warn("Could not load config.js:", e);
}

let sequelize: Sequelize;

const commonOptions = {
  dialect: 'postgres' as const,
  dialectModule: pg, // Crucial for Next.js/Vercel bundling
  logging: isProduction ? false : console.log,
  benchmark: !isProduction,
};

// Check for DATABASE_URL (Production or configured Dev)
if (process.env.DATABASE_URL) {
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    ...commonOptions,
    pool: {
      max: 5,
      min: 0, // optimize for serverless cold starts
      acquire: 60000,
      idle: 10000,
    },
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
      statement_timeout: 30000,
    },
  });
} else if (config && config.database) {
  // Development fallback using config.js
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
  // Build-time fallback to prevent crashes when env vars aren't present
  console.log("No valid database configuration found, using dummy connection for build.");
  sequelize = new Sequelize('postgresql://dummy:dummy@localhost:5432/dummy', {
    ...commonOptions,
    pool: { max: 1, min: 0 },
    logging: false,
  });
}

// Test connection attempt (non-blocking) in dev to verify
if (!isProduction) {
  sequelize.authenticate()
    .then(() => console.log('Database connection has been established successfully.'))
    .catch(err => console.error('Unable to connect to the database:', err));
}

export default sequelize;
