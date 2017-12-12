require('app-module-path').addPath(__dirname);

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const db = require('db');
const mountRoutes = require('./routes');
const PORT = process.env.PORT || 5150;

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('./models/user');

passport.use(new LocalStrategy({
    passReqToCallback: true,
    usernameField: 'email',
  },
  (req, email, password, next) => {
    User.find({ email })
      .then(user => {
        if (!user.authenticate(password)) {
          return next(null, false, { message: 'Incorrect password.' });
        }

        return next(null, user);
      })
      .catch(err => {
        return next(null, false, { message: 'Incorrect username.' });
      });
  }
));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(session({ secret: 'not-very-secret' }));
app.use(passport.initialize());
app.use(passport.session());

mountRoutes(app);

db.migrate.latest().then(() => {
  app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);
  });
});
