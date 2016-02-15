module.exports = function (Handlebars) {
  const fs = require('fs');
  const partials = ['head', 'header-notes', 'header-home', 'header-about', 'footer'];
  const partialsPath = '/../templates/partials/';

  partials.forEach((partial) => Handlebars.registerPartial(partial, fs.readFileSync(`${__dirname}${partialsPath}${partial}.hbt`).toString()));
};
