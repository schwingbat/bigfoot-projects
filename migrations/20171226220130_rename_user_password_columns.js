
exports.up = function(knex, Promise) {
  return knex.schema
    .alterTable('users', t => {
      t.dropColumn('passwordHash');
      t.dropColumn('passwordSalt');
      t.string('password_hash');
      t.string('password_salt');
    });
};

exports.down = function(knex, Promise) {
  return knex.schema
    .alterTable('users', t => {
      t.dropColumn('password_hash');
      t.dropColumn('password_salt');
      t.string('passwordHash');
      t.string('passwordSalt');
    });
};
