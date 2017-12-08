const fs = require('fs');
const path = require('path');
const router = require('express').Router();
const hbs = require('../../hbs');
const db = require('../../db');

const getTemplate = (filename) => fs.readFileSync(
  path.join(__dirname, 'templates', filename), 'utf8');

const templates = {
  info: hbs.compile(getTemplate('info.hbs')),
  project: hbs.compile(getTemplate('project.hbs')),
  projectNotFound: hbs.compile(getTemplate('project-not-found.hbs')),
};

router.get('/', (req, res) => {
  // Graphics request info and about page

  return res.send(templates.info());
});

router.get('/project/:id', (req, res) => {
  // Show the status of a particular project
  const project = db.query('SELECT * FROM projects WHERE id = $1 LIMIT 1', req.query.id);

  if (project) {
    return res.send(templates.project());
  } else {
    return res.send(templates.projectNotFound());
  }
});

router.post('/project', (req, res) => {
  // Submit a project
});

router.post('/project/:id/edit', (req, res) => {
  // Change info or details about an existing project.
});

module.exports = router;