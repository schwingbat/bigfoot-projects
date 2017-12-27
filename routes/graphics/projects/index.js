const router = require('express').Router();
const templates = require('utils/load-templates')(__dirname);
const { Project, Format } = require('models');

router.get('/', async (req, res) => {
  const projects = await Project.fetchAll();

  console.log(projects);

  const data = {
    projects: projects.rows || []
  };

  console.log(data);

  res.send(templates.projectIndex(data));
});

router.get('/new', async (req, res) => {
  console.log('running /projects/new')

  const formats = await Format.fetchAll();

  console.log(formats);

  const data = {
    formats
  };

  return res.send(templates.new(data));
});

router.get('/:id', async (req, res) => {
  console.log('running /projects/:id')

  // Show the status of a particular project
  const project = await Project({ id: Number(req.params.id) }).fetch();

  if (project) {
    return res.send(templates.project());
  } else {
    return res.send(templates.projectNotFound());
  }
});

router.post('/:id/edit', (req, res) => {
  // Change info or details about an existing project.
});
  // .post(async (req, res) => {
  //   // Submit a project
  //
  //   const { body } = req;
  //
  //   console.log(body);
  //
  //   const user = await db.createOrUpdateUser({
  //     name: body['user-name'],
  //     email: body['user-email'],
  //     phone: body['user-phone']
  //   });
  //
  //   const projectData = {
  //     name: body['project-name'],
  //     details: body['project-details'],
  //     due_date: new Date(body['project-due-date']),
  //     event_date: new Date(body['project-event-date']),
  //     user_id: user.id
  //   };
  //
  //   const project = await db.createProject(projectData);
  //
  //   if (project && project.id != null) {
  //     res.redirect(`/graphics/projects/${project.id}`);
  //   } else {
  //     res.redirect('/graphics/projects');
  //   }
  // });

module.exports = router;
