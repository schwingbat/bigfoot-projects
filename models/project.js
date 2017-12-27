const bookshelf = require('db/bookshelf');

module.exports = bookshelf.model('Project', {
  tableName: 'projects',
  hasTimestamps: true,
  owner() {
    return this.belongsTo('User');
  },
  attachments() {
    return this.hasMany('Attachment');
  },
  deliverables() {
    return this.hasMany('Deliverable');
  },
  progressState() {
    return this.hasOne('ProgressState', 'id');
  },
});
