const Metalsmith = require('metalsmith');
const markdown = require('metalsmith-markdown');
const templates = require('metalsmith-templates');
const collections = require('metalsmith-collections');
const permalinks = require('metalsmith-permalinks');
const Handlebars = require('handlebars');
const fs = require('fs');

const partials = ['head', 'header-blog', 'header-home', 'header-about', 'footer'];
const partialsPath = '/templates/partials/';

partials.forEach((partial) => Handlebars.registerPartial(partial, fs.readFileSync(`${__dirname}${partialsPath}${partial}.hbt`).toString()));

Metalsmith(__dirname)
  .use(collections({
    pages: {
      pattern: 'content/pages/*.md'
    },
    posts: {
      pattern: 'content/posts/*.md',
      sortBy: 'date',
      reverse: true
    }
  }))
  .use(markdown())
  .use(permalinks({
    pattern: ':collection/:title'
  }))
  .use(templates('handlebars'))
  .destination('./build')
  .build(function (err) { if(err) console.log(err) });

