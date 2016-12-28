const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

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

// Redirect all pages to here
app.use( (req, res, next) => {
    res.render('maintenance.hbs');
    //next();
});

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    res.send({
        'name': 'Theodore',
        'likes': [
            'Pho',
            'Yoga',
            'Tea'
        ]
    });
});

app.get('/about', (req, res) => {
    res.render('base.hbs', {
        pageTitle: 'About',
        welcomeMessage: 'Welcome to my site'
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000.');
});
