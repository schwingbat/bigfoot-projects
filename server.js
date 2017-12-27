require('app-module-path').addPath(__dirname);

const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const sass = require('node-sass-middleware');
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
app.use(sass({
  src: path.join(__dirname, 'sass'),
  dest: path.join(__dirname, 'public'),
  debug: true,
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'not-very-secret' }));
app.use(passport.initialize());
app.use(passport.session());

mountRoutes(app);

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
