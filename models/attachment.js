const { Model } = require('db/bookshelf');
const { Project } = require('models');

module.exports = Model.extend({
  tableName: 'attachments',
  project() {
    return this.hasOne(Project);
  },
});
