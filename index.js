const Metalsmith = require('metalsmith');
const markdown = require('metalsmith-markdown');
const templates = require('metalsmith-templates');
const collections = require('metalsmith-collections');
const permalinks = require('metalsmith-permalinks');
const Handlebars = require('handlebars');
const fs = require('fs');

const partials = ['head', 'header-notes', 'header-home', 'header-about', 'footer'];
const partialsPath = '/templates/partials/';

partials.forEach((partial) => Handlebars.registerPartial(partial, fs.readFileSync(`${__dirname}${partialsPath}${partial}.hbt`).toString()));

Handlebars.registerHelper('moodTube', (mood) => {
  const moods = {
    disco: 'dSuulW6XqSA',
    champloo: '_sccg1CZzi4',
    unfulfilled: 'gxEPV4kolz0',
    miserable: 'TaUUYV7wKos',
    oops: 'FgxEJOi6GtA',
    content: '_sccg1CZzi4',
    understood: 'OMyUvqTYzJ4',
    boogie: 'god7hAPv8f0',
    babo: 'BclmGVKdHII',
    purupururin: 'u_7z_WVcpdw',
  };

  return new Handlebars.SafeString(
    `<iframe src="https://www.youtube.com/embed/${moods[mood]}" frameborder="0" allowfullscreen></iframe>`
  );
});

Handlebars.registerHelper('ellipsis', (content) => {
  const contentText = content.toString().substring(0, 300).replace(/<\/?[^>]+(>|$)/g, "");
  return new Handlebars.SafeString(`${contentText}...`);
});

Handlebars.registerHelper('formatDate', (date) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const dateObj = new Date(date);
  return new Handlebars.SafeString(`${days[dateObj.getDay()]}, ${months[dateObj.getMonth()]} ${dateObj.getDate()}, ${dateObj.getFullYear()}`);
});

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

