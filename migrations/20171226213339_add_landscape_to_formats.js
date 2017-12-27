
exports.up = function(knex, Promise) {
  return knex.schema
    .alterTable('formats', t => {
      t.boolean('landscape').defaultTo(false);
    });
};

exports.down = function(knex, Promise) {
  return knex.schema
    .alterTable('formats', t => {
      t.dropColumn('landscape');
    });
};
