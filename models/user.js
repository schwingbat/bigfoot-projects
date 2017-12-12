const Model = require('./Model');
const knex = require('knex');
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

class User extends Model {
  constructor(data) {
    super({
      table: 'users',
      schema: userSchema,
      data
    });
  }

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
  }

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
  }

}

User.find = function(values) {
  // Find a particular user and return it as a User object.

  return new Promise((resolve, reject) => {
    if (typeof values === 'number') {
      values = { id: values };
    }

    knex.select('*').from(this.prototype.table).where(values).limit(1)
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
  return knex.select('*').from(this.prototype.table)
    .then(users => users.map(u => new User(u)));
}

User.create = function(data) {
  return new User(data);
}

module.exports = User;
