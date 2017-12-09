const graphics = require('./graphics');

module.exports = (app) => {
  app.use('/graphics', graphics);
};
