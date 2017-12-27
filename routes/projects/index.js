const router = require('express').Router();
const templates = require('utils/load-templates')(__dirname);
const { Project, Format, User } = require('models');

router.route('/new')
  .get(async (req, res) => {
    const data = {};

    try {
      const formats = await Format.fetchAll();
      data.formats = formats.models.map(m => m.toJSON());
    } catch (err) {
      data.formats = [];
      console.error(err);
    }

    return res.send(templates.newProject(data));
  })
  .post(async (req, res) => {
    const { body } = req;

    // Take care of user data.
    const userData = {
      name: body['user-name'],
      email: body['user-email'],
      phone: body['user-phone'],
      // organization: body['user-org'],
    };

    let user;

    try {
      user = await User.where({ email: body['user-email'] }).fetch();
    } catch (err) {}

    if (user) {
      user.set(userData);
    } else {
      user = new User(userData);
    }

    await user.save();

    const projectData = {
      name: body['project-name'],
      user_id: user.get('id'),
      progress_state_id: 1,
    };

    if (body['project-details']) {
      projectData.details = body['project-details'];
    }

    if (body['project-due-date']) {
      projectData.due_date = body['project-due-date'];
    }

    if (body['project-event-date']) {
      projectData.event_date = body['project-event-date'];
    }

    // Now create the project.
    const project = new Project(projectData);
    await project.save();

    console.log(await project.fetch({ withRelated: ['owner', 'progressState'] }));

    return res.json({
      user: user.serialize(),
      project: project.serialize(),
    });
  });

router.get('/find', async (req, res) => {
  return res.send(templates.findProject());
})

router.get('/:email?', async (req, res) => {
  console.log('hello');

  const data = {};
  const { email } = req.params;

  try {
    let projects;
    if (email) {
      data.email = email;
      projects = await Project.where({ email }).fetchAll();
    } else {
      projects = await Project.fetchAll();
    }
    data.projects = projects.models.map(m => m.toJSON());
  } catch (err) {
    data.projects = [];
  }

  console.log(data);

  return res.send(templates.listProjects(data));
});

module.exports = router;