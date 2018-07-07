<<<<<<< HEAD
const Model = require('./Model');

const projectSchema = {

}
=======
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
>>>>>>> e13b56939bafafea475ddabd9d30f301389ed3a1
