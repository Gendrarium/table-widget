const pg = require('pg');
const {
  NODE_ENV,
  DB_NAME,
  DB_USER_NAME,
  DB_PORT,
  DB_HOST,
  DB_USER_PASSWORD,
  DATABASE_URL,
} = require('../config');

const isProduction = NODE_ENV === 'production';

// configuration details
const connectionString = `postgresql://${DB_USER_NAME}:${DB_USER_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;

// if project has been deployed, connect with the host's DATABASE_URL
// else connect with the local DATABASE_URL
const pool = new pg.Pool({
  connectionString: isProduction ? DATABASE_URL : connectionString,
  ssl: isProduction,
  max: 1000
});

pool.on('connect', () => {
  console.log('connected to the Database');
});

const createTables = () => {
  const imageTable = `CREATE TABLE IF NOT EXISTS
    cities(
      id SERIAL PRIMARY KEY,
      date DATE NOT NULL,
      name VARCHAR(128) NOT NULL,
      amount INTEGER NOT NULL,
      distance INTEGER NOT NULL
    )`;
  pool
    .query(imageTable)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

pool.on('remove', () => {
  console.log('client removed');
  process.exit(0);
});

//export pool and createTables to be accessible from anywhere within the application
module.exports = {
  createTables,
  pool,
};

require('make-runnable');
