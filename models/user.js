<<<<<<< HEAD
const Model = require('./Model');
const knex = require('knex');
=======
>>>>>>> e13b56939bafafea475ddabd9d30f301389ed3a1
const bcrypt = require('bcrypt');
const bookshelf = require('db/bookshelf');

const saltRounds = 10;
<<<<<<< HEAD
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

=======

module.exports = bookshelf.model('User', {
  tableName: 'users',
  hasTimestamps: true,
  projects() {
    return this.hasMany('Project');
  },
>>>>>>> e13b56939bafafea475ddabd9d30f301389ed3a1
  authenticate(password) {
    return new Promise((resolve, reject) => {
      console.log('this is this', this);
      const hash = this.get('password_hash');
      bcrypt.compare(password, hash, (err, match) => {
        if (err) return reject(`There was a problem comparing passwords: ${err.message}`);
        if (match) {
          return resolve(this);
        } else {
          return reject(`Passwords did not match.`);
        }
      });
    });
  }

  setPassword(password) {
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(saltRounds, (err, salt) => {
        if (err) return reject(`There was a problem setting the password: ${err.message}`);
        bcrypt.hash(password, salt, (err, hash) => {
          if (err) return reject(`There was a problem setting the password. ${err.message}`);
          this.set({
            password_salt: salt,
            password_hash: hash,
          });
          this.save()
            .then(resolve)
            .catch(reject);
        });
      });
      return resolve();
    });
  }
<<<<<<< HEAD

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
=======
});
>>>>>>> e13b56939bafafea475ddabd9d30f301389ed3a1
