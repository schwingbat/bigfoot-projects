const db = require('../db');
const bcrypt = require('bcrypt');

const saltRounds = 10;
const userSchema = {
  id: {
    column: 'id',
    primaryKey: true,
  },
  name: {
    column: 'name',
    required: true,
  },
  email: {
    column: 'email',
    required: true,
  },
  phone: {
    column: 'phone',
  },
  passwordSalt: {
    column: 'password_salt',
  },
  passwordHash: {
    column: 'password_hash',
  },
};

function User(data) {
  this.applyProps(data);
}

User.prototype = {
  schema: userSchema,
  table: 'users',

  applyProps(props) {
    for (const d in props) {
      for (const s in this.schema) {
        if (this.schema[s].column.toLowerCase() === d.toLowerCase()) {
          this[s] = props[d];
        }
      }
    }
  },
  columnNames() {
    const cols = [];
    for (const key in this.schema) {
      const v = this.schema[key];
      if (v && v.column) {
        cols.push(v.column);
      }
    }
    return cols;
  },

  validate() {
    // Check current values against schema.
    const errs = [];

    for (const key in this.schema) {
      if (this.schema[key].required && (!this[key] || this[key] == null)) {
        errs.push(`Property ${key} is required. Current value is ${this[key]}.`);
        continue;
      }
    }

    return {
      valid: errs.length === 0,
      err: 'Failed to validate: ' + errs.join(' / '),
    };
  },
  authenticate(password) {
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, this.passwordSalt, (err, hash) => {
        if (err) return reject(err);
        if (hash === this.passwordHash) {
          return resolve(this);
        } else {
          return reject(new Error(`Incorrect password.`));
        }
      });
    });
  },
  setPassword(password) {
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(saltRounds, (err, salt) => {
        if (err) return reject(err);
        bcrypt.hash(password, salt, (err, hash) => {
          if (err) return reject(err);
          this.passwordHash = hash;
          this.passwordSalt = salt;

          return resolve(this);
        });
      });
    });
  },
  sync() {
    return new Promise((resolve, reject) => {
      const { valid, err } = this.validate();
      if (!valid) {
        return reject(err);
      }

      const props = {};
      for (const key in this.schema) {
        if (this[key]) {
          props[this.schema[key].column] = this[key];
        }
      }

      if (this.id) {
        db(this.table)
          .update(props)
          .where({ id: this.id })
          .returning(this.columnNames())
          .then(cols => {
            this.applyProps(cols);
            return resolve(this);
          })
          .catch(reject);
      } else {
        db(this.table)
          .insert(props)
          .returning(this.columnNames())
          .then(cols => {
            this.applyProps(cols);
            return resolve(this);
          })
          .catch(reject);
      }
    });
  },
}

User.find = function(values) {
  // Find a particular user and return it as a User object.

  return new Promise((resolve, reject) => {
    if (typeof values === 'number') {
      values = { id: values };
    }

    db.select('*').from(this.prototype.table).where(values).limit(1)
      .then(users => {
        if (users.length === 0) {
          return reject(new Error(`No users found matching the criteria - ${values}`));
        } else {
          return resolve(new User(users[0]));
        }
      })
      .catch(err => {
        return reject(`Failed to find user - ${err}`);
      });
  });
}

User.all = function() {
  // Get all users and map them to a User object.
  return db.select('*').from(this.prototype.table)
    .then(users => users.map(u => new User(u)));
}

User.create = function(data) {
  return new User(data);
}

module.exports = User;
