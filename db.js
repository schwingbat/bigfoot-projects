const { Pool } = require('pg');

let config = {
  max: 10,
};

if (process.env.NODE_ENV !== 'production') {
  const secrets = require('./secrets.json');

  config = Object.assign(config, secrets);
}

console.log(config);

// Pool configures itself using environment variables
const db = new Pool(config);

async function query(q, vals) {
  const client = await db.connect();
  const result = await client.query(q, vals);
  client.release();

  return result;
};

/*===============================*\
||        Query Builders         ||
\*===============================*/

function insertQueryFor(table, data) {
  // Generates an insert query to be used with the query function.

  let statement = 'INSERT INTO ' + table + ' (';
  let fields = [];
  let values = [];
  let count = 1;

  let vals = [];

  for (const key in data) {
    fields.push(key);
    values.push('$' + count);
    vals.push(data[key]);
    count += 1;
  }

  statement += fields.join(', ') + ') VALUES (' + values.join(', ') + ')';

  return {
    statement,
    values: vals,
  };
}

function updateQueryFor(table, data, where) {
  let statement = 'UPDATE ' + table + ' SET ';
  let fields = [];
  let count = 1;

  let vals = [];

  for (const key in data) {
    if (data[key]) {
      fields.push(`${key} = ${'$' + count}`);
      vals.push(data[key]);
      count += 1;
    }
  }

  statement += fields.join(', ');

  // Turn a where object into a string.
  if (where && typeof where === 'object') {
    let w = [];
    for (const key in where) {
      w.push(`${key} = '${where[key]}'`);
    }
    statement += ' WHERE ' + w.join(', ');
  }

  return {
    statement,
    values: vals,
  };
}

/*===============================*\
||    User Management Helpers    ||
\*===============================*/

async function userExists(email) {
  const result = await query('SELECT * FROM users WHERE email = $1', [ email ]);
  return result.rows.length > 0;
}

async function createOrUpdateUser(data) {
  if (await userExists(data.email)) {
    const q = updateQueryFor('users', data, { email: data.email });
    await query(q.statement, q.values);
  } else {
    await query('INSERT INTO users (name, email, phone) VALUES ($1, $2, $3)', [
      data.name,
      data.email,
      data.phone
    ]);
  }

  const user = await query('SELECT * FROM users WHERE email = $1 LIMIT 1', [ data.email ]);

  if (user.rows.length > 0) {
    return user.rows[0];
  } else {
    return null;
  }
}

async function userIsInGroup(group, userID) {

}

/*===============================*\
||   Project Management Helpers  ||
\*===============================*/

async function createProject(data) {
  const { statement, values } = insertQueryFor('projects', data);
  await query(statement, values);
  const project = query('SELECT * FROM projects WHERE name = $1 LIMIT 1', [ data.name ]);

  console.log(project);

  if (project.rows && project.rows.length > 0) {
    return project.rows[0];
  } else {
    return null;
  }
}

module.exports = {
  query,
  insertQueryFor,
  updateQueryFor,

  // Users
  userExists,
  createOrUpdateUser,
  userIsInGroup,

  // Projects
  createProject,
};
