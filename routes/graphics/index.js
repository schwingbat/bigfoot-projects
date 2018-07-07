const path = require('path');
const router = require('express').Router();
<<<<<<< HEAD
const loadTemplates = require('utils/load-templates');
const User = require('models/user');
const Project = require('models/project');
=======
const templates = require('utils/load-templates')(__dirname);
const { Project, Format } = require('models');
>>>>>>> e13b56939bafafea475ddabd9d30f301389ed3a1

router.use('/projects', require('./projects'));

router.get('/', (req, res) => {
  // Graphics request info and about page

  return res.send(templates.info());
});

<<<<<<< HEAD
router.get('/projects', async (req, res) => {
  const projects = await knex('projects').select('*');

  const data = {
    projects: projects.rows || []
  };

  console.log(data);

  res.send(templates.projectIndex(data));
});

router.get('/projects/new', async (req, res) => {
  console.log('running /projects/new')

  const formats = await db.query('SELECT * FROM formats');

  const data = {
    formats: formats.rows
  };

  return res.send(templates.newProject(data));
});

router.get('/projects/:id', async (req, res) => {
  console.log('running /projects/:id')

  // Show the status of a particular project
  const project = await db.query('SELECT * FROM projects WHERE id = $1 LIMIT 1', req.query.id);

  if (project) {
    return res.send(templates.project());
  } else {
    return res.send(templates.projectNotFound());
  }
});

router.post('/projects/new', async (req, res) => {
  // Submit a project

  const { body } = req;

  console.log(body);

  const user = await db.createOrUpdateUser({
    name: body['user-name'],
    email: body['user-email'],
    phone: body['user-phone']
  });

  const projectData = {
    name: body['project-name'],
    details: body['project-details'],
    due_date: new Date(body['project-due-date']),
    event_date: new Date(body['project-event-date']),
    user_id: user.id
  };

  const project = await db.createProject(projectData);

  if (project && project.id != null) {
    res.redirect(`/graphics/projects/${project.id}`);
  } else {
    res.redirect('/graphics/projects');
  }
});

router.post('/projects/:id/edit', (req, res) => {
  // Change info or details about an existing project.
});

=======
>>>>>>> e13b56939bafafea475ddabd9d30f301389ed3a1
module.exports = router;
