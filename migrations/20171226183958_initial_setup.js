
exports.up = function(knex, Promise) {
  return knex.schema
    .createTable('users', t => {
      // Users own and submit projects. Most users will not formally log in.
      // This information will be filled when they submit a project with contact info.
      // Members of Bigfoot Marketing or more frequent requesters may wish to log in
      // if they submit a lot of projects.
      t.increments();
      t.string('name').notNullable();
      t.string('email').notNullable();
      t.string('phone').notNullable();
      t.string('passwordHash');
      t.string('passwordSalt');
      t.timestamps();
    })
    .createTable('progress_states', t => {
      // Represents the state of completion the project may be in. From 'submitted' to 'finished'.
      t.increments();
      t.string('label').notNullable();
    })
    .createTable('projects', t => {
      // The, uh... the project.
      t.increments();
      t.string('name').notNullable();
      t.text('details');
      t.integer('progress_state_id').references('id').inTable('progress_states').defaultsTo(1);
      t.date('due_date');
      t.date('event_date');
      t.timestamps();
      t.integer('user_id').references('id').inTable('users').notNullable();
    })
    .createTable('formats', t => {
      // Paper and size, digital, or other?
      t.increments();
      t.string('name').notNullable();
      t.string('description').notNullable();
      t.boolean('digital');
      t.decimal('width');
      t.decimal('height');
      t.boolean('in_stock').defaultsTo(true);
    })
    .createTable('deliverables', t => {
      // Represents one type/format of thing to be delivered to the client.
      // For example, an A-Frame poster and an 11x17 would be two different deliverables.
      // Either has a format_id or has its properties set by the user ('custom' option)
      t.increments();
      t.integer('project_id').references('id').inTable('projects').notNullable();
      t.integer('format_id').references('id').inTable('formats');
      t.boolean('digital');
      t.decimal('width');
      t.decimal('height');
      t.boolean('landscape');
      t.text('comments');
      t.timestamps();
    })
    .createTable('attachments', t => {
      // Files users have attached to projects. Could be graphics or anything else, really.
      // These will be links to objects in Amazon S3.
      t.increments();
      t.integer('project_id').references('id').inTable('projects').notNullable();
      t.string('path').notNullable();
      t.timestamps();
    })
    .createTable('groups', t => {
      // Bigfoot Events, Clients, etc.
      // Determines permissions for interacting with projects.
      t.increments();
      t.string('name').notNullable();
      t.timestamps();
    })
    .createTable('memberships', t => {
      // Links users with groups they're in.
      t.increments();
      t.integer('user_id').references('id').inTable('users').notNullable();
      t.integer('group_id').references('id').inTable('groups').notNullable();
      t.timestamps();
    });
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTable('users')
    .dropTable('progress_states')
    .dropTable('projects')
    .dropTable('formats')
    .dropTable('deliverables')
    .dropTable('attachments')
    .dropTable('groups')
    .dropTable('memberships');
};
