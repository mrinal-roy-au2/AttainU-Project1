/*jshint esversion: 6*/

const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const students = require('./dbfolder/students.json');
const app = express();
PORT = 8080;

app.use(session({
    secret: "This is the unknown secret."
}));

app.use(bodyParser.urlencoded());

app.use(express.static('public'));

app.get('/login', (req, res) => {
  res.sendfile('./public/index.html');
});

// Authentication Route /auth to verify students login
app.post('/auth', (req, res) => {
    for (var i=0; i<students.length; i++) {
        if ((students[i].User_name === req.body.username) && (students[i].Password === req.body.password)) {
            req.session.loggedIn = true; }
    }
    res.redirect('/user');
});

// Redirection Route /login only visible after successful login with a logout link
app.get('/user', (req, res) => {
    if (req.session.loggedIn === true) {
        res.sendfile('./public/web-mail.html');
    } else {
        res.redirect('/login');
    }
});

// Logout Route /logout to destroy the session
app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login');
});



app.listen(PORT, ()=> { console.log("Express_Session Server is running in Port "+PORT);});
