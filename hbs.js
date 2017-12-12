const fs = require('fs');
const path = require('path');
const handlebars = require('handlebars');

handlebars.registerPartial('head',
  fs.readFileSync(path.join(__dirname, 'partials', 'head.hbs'), 'utf8'));

handlebars.registerPartial('header',
  fs.readFileSync(path.join(__dirname, 'partials', 'header.hbs'), 'utf8'));

handlebars.registerPartial('footer',
  fs.readFileSync(path.join(__dirname, 'partials', 'footer.hbs'), 'utf8'));

module.exports = handlebars;
