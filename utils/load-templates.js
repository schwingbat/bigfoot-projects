const fs = require('fs');
const path = require('path');
const handlebars = require('partials');
const changeCase = require('change-case');

const globalTemplates = path.join(process.env.PWD, 'templates');

module.exports = function(dir) {
  const templatePath = path.join(dir, '_templates');
  const templates = {};

  // Load global templates.
  if (fs.existsSync(globalTemplates)) {
    fs.readdirSync(globalTemplates).forEach(f => {
      const name = changeCase.camelCase(path.basename(f, path.extname(f)));
      templates[name] = handlebars.compile(fs.readFileSync(path.join(globalTemplates, f), 'utf8'));
    });
  }

  // Load local templates.
  if (fs.existsSync(templatePath)) {
    fs.readdirSync(templatePath).forEach(f => {
      const name = changeCase.camelCase(path.basename(f, path.extname(f)));
      templates[name] = handlebars.compile(fs.readFileSync(path.join(templatePath, f), 'utf8'));
    });
  }

  return templates;
}
