const knex = require('./index.js');
const bookshelf = require('bookshelf')(knex);

bookshelf.plugin('registry');
bookshelf.plugin('virtuals');

module.exports = bookshelf;
