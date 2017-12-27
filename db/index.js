const path = require('path');
module.exports = require('knex')({
  client: 'pg',
  connection: process.env.NODE_ENV === 'production'
    ? process.env.DATABASE_URL
    : require(path.join(__dirname, 'secrets.json')),
});
