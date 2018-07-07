const bookshelf = require('db/bookshelf');

module.exports = bookshelf.model('Format', {
  tableName: 'formats',
});
