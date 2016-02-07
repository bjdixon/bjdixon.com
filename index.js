const Metalsmith = require('metalsmith');
const markdown = require('metalsmith-markdown');
const templates = require('metalsmith-templates');
const collections = require('metalsmith-collections');
const permalinks = require('metalsmith-permalinks');
const Handlebars = require('handlebars');
const fs = require('fs');

Handlebars.registerPartial('header-blog', fs.readFileSync(__dirname + '/templates/partials/header-blog.hbt').toString());
Handlebars.registerPartial('header-home', fs.readFileSync(__dirname + '/templates/partials/header-home.hbt').toString());
Handlebars.registerPartial('header-about', fs.readFileSync(__dirname + '/templates/partials/header-about.hbt').toString());
Handlebars.registerPartial('footer', fs.readFileSync(__dirname + '/templates/partials/footer.hbt').toString());

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

