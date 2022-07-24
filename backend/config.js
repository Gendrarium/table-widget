require('dotenv').config();

const {
  PORT,
  NODE_ENV,
  FRONTEND_URL,
  DB_NAME,
  DB_HOST,
  DB_PORT,
  DB_USER_NAME,
  DB_USER_PASSWORD,
  DATABASE_URL,
} = process.env;

module.exports = {
  PORT,
  NODE_ENV,
  FRONTEND_URL,
  DB_NAME,
  DB_HOST,
  DB_PORT,
  DB_USER_NAME,
  DB_USER_PASSWORD,
  DATABASE_URL,
};
