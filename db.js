if (process.env.NODE_ENV == 'production') {
  /*=========================*\
  ||    PRODUCTION CONFIG    ||
  \*=========================*/

  throw Error('Production environment is not yet configured.');

  // const { Pool } = require('pg');

  // const pool = new Pool({
  //   host: ,
  //   user: 'scc-slc-user',
  //   max: 10,
  //   idleTimeoutMillis: 30000,
  //   connectionTimeoutMillis: 2000,
  // });

  // exports.query = async function(q, vals) {
  //   const client = await pool.connect();
  //   const result = await client.query(q, vals);
  //   client.release();

  //   return result;
  // };
} else {
  /*========================*\
  ||   DEVELOPMENT CONFIG   ||
  \*========================*/

  const sqlite = require('sqlite3').verbose();
  const db = new sqlite.Database('dev.db');

  exports.query = async function(q, vals) {
    const stmt = db.prepare(q);
    const result = stmt.run(vals);
    stmt.finalize();
    return result;
  }
}