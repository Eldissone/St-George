require('dotenv').config();

const required = ['SESSION_SECRET'];
for (const name of required) {
  if (!process.env[name] && process.env.NODE_ENV === 'production') {
    throw new Error(`Missing required environment variable: ${name}`);
  }
}

module.exports = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT || 4000),
  sessionSecret: process.env.SESSION_SECRET || 'local-development-secret-change-me'
};
