const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();
hbs.registerPartials(__dirname + '/views/partials');

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', err => {
    if (err) {
      console.log(`Unable to append to server.log`);
    }
  });
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', text => {
  return text.toUpperCase();
});

app.set('view engine', 'hbs');
app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home page',
    welcomeMessage:
      'Explicabo cumque qui sit eos voluptatem est nam dolorum. Quibusdam aut et. Nostrum quasi ut fugit ut maxime et hic. Suscipit rerum officia perspiciatis quam in.Ut dolores vel facilis fugit exercitationem sed.Et quia modi repudiandae libero maiores sint hic.'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About page'
  });
});

app.get('/bad', (req, res) => {
  res.send({ error: 'Error happened oh no' });
});

app.get('/projects', (req, res) => {
  res.render('projects.hbs', { pageTitle: 'Project page' });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
