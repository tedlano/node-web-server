const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use( (req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err){
            console.log('Unable to append server.log');
        }
    });
    next();
});

//Serve up static files
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home'
    });
});

app.get('/about', (req, res) => {
    res.render('base.hbs', {
        pageTitle: 'About',
        welcomeMessage: 'Welcome to my site'
    });
});

app.get('/numbers-quiz', (req, res) => {
    res.render('numbers-quiz.hbs', {
        pageTitle: 'Numbers Quiz'
    });
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}.`);
});
