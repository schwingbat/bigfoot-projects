const path = require('path');
const router = require('express').Router();
const templates = require('utils/load-templates')(__dirname);
const { Project, Format } = require('models');

router.use('/projects', require('./projects'));

router.get('/', (req, res) => {
  // Graphics request info and about page

  return res.send(templates.info());
});

module.exports = router;
