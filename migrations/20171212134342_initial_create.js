
exports.up = function(knex, Promise) {
  return knex.schema
    .createTableIfNotExists('users', t => {
      t.increments();
      t.string('name').notNullable();
      t.string('email').notNullable();
      t.string('phone');
      t.string('password_hash');
      t.string('password_salt');
      t.timestamps();

      t.unique('email');
    })
    .createTableIfNotExists('groups', t => {
      t.increments();
      t.string('name');
      t.string('description');
    })
    .createTableIfNotExists('memberships', t => {
      t.increments();
      t.integer('group_id').notNullable();
      t.integer('user_id').notNullable();

      t.foreign('group_id').references('id').inTable('groups');
      t.foreign('user_id').references('id').inTable('users');
    })
    .createTableIfNotExists('progress_states', t => {
      t.integer('id');
      t.string('label').notNullable();

      t.unique('id');
      t.primary('id');
    })
    .createTableIfNotExists('projects', t => {
      t.increments();
      t.string('name').notNullable();
      t.text('details');
      t.integer('progress_state').defaultTo(1);
      t.date('due_date');
      t.date('event_date');
      t.integer('user_id').notNullable();

      t.timestamps();

      t.foreign('progress_state').references('id').inTable('progress_states');
      t.foreign('user_id').references('id').inTable('users');
    })
    .createTableIfNotExists('attachments', t => {
      t.increments();
      t.integer('project_id').notNullable();
      t.string('file_path').notNullable();

      t.foreign('project_id').references('id').inTable('projects');
    })
    .createTableIfNotExists('formats', t => {
      t.increments();
      t.string('name').notNullable();
      t.string('description').notNullable();
      t.boolean('in_stock').defaultTo(true);
    })
    .createTableIfNotExists('deliverables', t => {
      t.increments();
      t.integer('format_id').notNullable();
      t.integer('project_id').notNullable();

      t.foreign('format_id').references('id').inTable('formats');
      t.foreign('project_id').references('id').inTable('projects');
    });
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists('users')
    .dropTableIfExists('groups')
    .dropTableIfExists('memberships')
    .dropTableIfExists('projects')
    .dropTableIfExists('progress_states')
    .dropTableIfExists('attachments')
    .dropTableIfExists('deliverables')
    .dropTableIfExists('formats');
};
