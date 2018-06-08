const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');
hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text)=>{
  return text.toUpperCase();
});

app.use((req, res, next)=>{
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  fs.appendFile('logs.log',log + '\n',(err)=>{
    if(err)
    {
      console.log('Error');
    }
  });
  console.log('yedas kay');
  next();
});

// app.use((req, res, next)=>{
//   res.render('maintanance.hbs');
// });

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) =>{
  res.render('home.hbs',{
    title: 'Home Page',
    name: 'Abhi',
    hobbies: [
    'Music',
    'Biking'
  ]
});
});

app.get('/about', (req, res)=>{
  res.render('about.hbs', {
    title: 'About Page'
  })
});

app.get('/bad', (req, res)=>{
  res.send({
    errorMessage: 'Unable to handle resquest'
  });
});

app.listen(5000, ()=>{
  console.log('Server is up on port 5000');
});
