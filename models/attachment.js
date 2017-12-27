const bookshelf = require('db/bookshelf');

module.exports = bookshelf.model('Attachment', {
  tableName: 'attachments',
  hasTimestamps: true,
  project() {
    return this.belongsTo('Project');
  },
});
