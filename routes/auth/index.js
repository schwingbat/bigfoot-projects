const router = require('express').Router();
const passport = require('passport');
const path = require('path');
const loadTemplates = require('utils/load-templates');

const templates = loadTemplates(path.join(__dirname, 'templates'));

router.get('/login', (req, res) => {
  res.send(templates.login());
});

router.post('/login', (req, res) => {
  console.log(req.body);
  res.send('LORG EN');
});

module.exports = router;
