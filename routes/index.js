const graphics = require('./graphics/graphics');

module.exports = (app) => {
  app.use('/graphics', graphics);
};