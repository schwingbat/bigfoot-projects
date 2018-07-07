const bookshelf = require('db/bookshelf');

module.exports = bookshelf.model('ProgressState', {
  tableName: 'progress_states',
  projects() {
    return this.hasMany('Project');
  }
});
