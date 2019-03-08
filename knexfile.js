// Update with your config settings.
require('dotenv').config();

const pg = require("pg");
pg.defaults.ssl = true;

const prodDbConnection = process.env.DATABASE_URL || {
  host: "localhost",
  database: "lambda",
  user: "student",
  password: "hired!"
};

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/hobbits-dev.db3',
    },
    useNullAsDefault: true,
    migrations: {
      directory: './data/migrations',
    },
    seeds: {
      directory: './data/seeds',
    },
  },
  production: {
    client: 'pg',
    connection: prodDbConnection,
    useNullAsDefault: true,
    migrations: {
      directory: './data/migrations',
    },
    seeds: {
      directory: './data/seeds',
    },
  },
  testing: {
    client: 'sqlite3',
    connection: {
      filename: './data/hobbits-test.db3',
    },
    useNullAsDefault: true,
    migrations: {
      directory: './data/migrations',
    },
    seeds: {
      directory: './data/seeds',
    },
  },
};
