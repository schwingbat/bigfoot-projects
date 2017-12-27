const bcrypt = require('bcrypt');
const bookshelf = require('db/bookshelf');

const saltRounds = 10;

module.exports = bookshelf.model('User', {
  tableName: 'users',
  hasTimestamps: true,
  projects() {
    return this.hasMany('Project');
  },
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
  },
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
});
