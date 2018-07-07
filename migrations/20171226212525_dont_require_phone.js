
exports.up = function(knex, Promise) {
  return knex.schema.raw('ALTER TABLE users ALTER COLUMN phone DROP NOT NULL');
};

exports.down = function(knex, Promise) {
  return knex.schema.raw('ALTER TABLE users ALTER COLUMN phone SET NOT NULL');
};
