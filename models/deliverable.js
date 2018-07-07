const bookshelf = require('db/bookshelf');

module.exports = bookshelf.model('Deliverable', {
  tableName: 'deliverables',
  project() {
    return this.hasOne('Project');
  },
  format() {
    return this.hasOne('Format');
  }
});
