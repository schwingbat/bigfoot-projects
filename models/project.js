const db = require('db');
const { Model } = require('db/bookshelf');
const {
  User,
  Attachment,
  Deliverable,
  ProgressState
} = require('models');

module.exports = Model.extend({
  tableName: 'projects',
  owner() {
    return this.hasOne(User);
  },
  attachments() {
    return this.hasMany(Attachment);
  },
  deliverables() {
    return this.hasMany(Deliverable);
  },
  status() {
    return this.hasOne(ProgressState);
  },
});
