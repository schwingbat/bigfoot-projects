const fs = require('fs');
const path = require('path');
const hbs = require('hbs');
const changeCase = require('change-case');

module.exports = function(templatePath) {
  const files = fs.readdirSync(templatePath);
  const templates = {};

  files.forEach(f => {
    const name = changeCase.camelCase(path.basename(f, path.extname(f)));
    templates[name] = hbs.compile(fs.readFileSync(path.join(templatePath, f), 'utf8'));
  });

  return templates;
}
