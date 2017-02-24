/**
 * Created by nuno_gouveia on 20/02/2017.
 */
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

// Settings for Heroku Virtual Dynamic Port Assignment Or Local Development
let port = process.env.PORT || 3000;
let app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use( (req,res,next) => {
    let now = new Date().toString();

    log = `${now}: ${req.method} ${req.url}`;
    fs.appendFile('server.log' , log +'\n',(err) => {
        if(err) {
            console.log('unable to append to server.log.');
        }
    });
    next();
});

/*
app.use( (req,res,next) => {
    res.render('maintenance.hbs', {
        pageTitle:'Maintenance Page'
    });
});
*/
app.use( express.static( __dirname + '/public') );

hbs.registerHelper('getCurrentYear',() => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text) => {
  return text.toUpperCase();
});

 app.get( '/', (req,res) => {
     res.render('home.hbs', {
        pageTitle  : 'Home Page',
        headerText : 'Home Page',
        welcomeText: 'Welcome to my website'
     });
});

app.get('/about', (req,res) => {
    res.render('about.hbs', {
        pageTitle  : 'About Page',
        headerText : 'About Page'
    });
});

app.get('/projects', (req,res) => {
    res.render('projects.hbs', {
        pageTitle    : 'Projects Page',
        headerText   : 'Projects List',
        projectsList : ['Weather App','Server App','Address Book App','Heroku App']
    });
});

// /bad - send back json with errorMessage
app.get('/bad', (req,res) => {
   res.send( {
       errorMessage : 'Unable to handle request'
    });
});

app.listen(port, ()=> {
    console.log(`Server is up and running on port ${port}.`)
});