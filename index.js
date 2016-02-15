const Metalsmith = require('metalsmith');
const markdown = require('metalsmith-markdown');
const templates = require('metalsmith-templates');
const collections = require('metalsmith-collections');
const permalinks = require('metalsmith-permalinks');
const Handlebars = require('handlebars');

require('./lib/partials')(Handlebars);
require('./lib/helpers')(Handlebars);

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
  .use(markdown({ gfm: false }))
  .use(permalinks({
    pattern: ':collection/:title'
  }))
  .use(templates('handlebars'))
  .destination('./build')
  .build(function (err) { if(err) console.log(err) });

