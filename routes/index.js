const templates = require('utils/load-templates')(__dirname);
const root = require('./root');
const graphics = require('./graphics');

module.exports = (app) => {
  app.use('/', root);
  app.use('/graphics', graphics);
  app.get('*', (req, res) => res.send(templates.notFound()));
};
