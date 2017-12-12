const graphics = require('./graphics');
const auth = require('./auth');

module.exports = (app) => {
  app.use('/graphics', graphics);
  app.use('/', auth);
};
