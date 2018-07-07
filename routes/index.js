const templates = require('utils/load-templates')(__dirname);
const root = require('./root');
const projects = require('./projects');

module.exports = (app) => {
  app.use('/', root);
  app.use('/projects', projects);
  app.get('*', (req, res) => res.send(templates.notFound()));
};
