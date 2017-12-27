const { Model } = require('db/bookshelf');
const { Project, Format } = require('models');

module.exports = Model.extend({
  tableName: 'deliverables',
  project() {
    return this.hasOne(Project);
  },
  format() {
    return this.hasOne(Format);
  }
});
