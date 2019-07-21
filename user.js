/*jshint esversion: 6*/

const express = require("express");
const router = express.Router();

const bodyParser = require("body-parser");
const session = require("express-session");
const mongoClient = require("mongodb").MongoClient;
const userlist = require("./dbfolder/userlist.json");
const path = require("path");

const scriptPath = path.join(__dirname, "/scripts");
const cssPath = path.join(__dirname, "/css");
const htmlPath = path.join(__dirname, "/userfiles");
const dbPath = path.join(__dirname, "/dbfolder");
const imgPath = path.join(__dirname, "/images");
const jsPath = path.join(__dirname, '/js');


router.use("/js", express.static(jsPath));
router.use("/css", express.static(cssPath));

// opens login & new user page
router.get("/login", function(req, res) {
  var db = req.app.locals.db;
  if (req.session.loggedIn === true) {
    res.send('indexloggedin.html');
  } else {
    res.sendfile("login.html");
  }
});

// Authentication Route to verify user login credentials & creates session variables
router.post("/auth", function(req, res) {
  var db = req.app.locals.db;
  db.collection('user').findOne({ username: req.body.username}, function(err, user) {
    if(user === null){
      res.send('No user found' + ' <a href="/">Go to the home page & signup</a>');
    } else if (user.username === req.body.username && user.password === req.body.password) {
      req.session.loggedIn = true;
      req.session.username = user.username;
      req.session.password = user.password;
      req.session.mailID = user.email;
      console.log("Valid User");
      res.redirect('/');
    } else {
      console.log("Wrong Credentials");
      res.send("Invalid Username or Password");
      res.redirect('/login');
    }
  });
  // for (var i = 0; i < userlist.length; i++) {
  //   if (
  //     userlist[i].username === req.body.username &&
  //     userlist[i].password === req.body.password
  //   ) {
  //     req.session.loggedIn = true;
  //     req.session.username = userlist[i].username;
  //     req.session.password = userlist[i].password;
  //     req.session.mailID = userlist[i].email;

});

/*Checks unauthorsied access to myportfolio & mywatchlist pages*/
router.use(function(req, res, next) {
  var db = req.app.locals.db;
  if (
    req.session.loggedIn != true &&
    (req.originalUrl.indexOf("myportfolio.html") != -1 ||
      req.originalUrl.indexOf("mywatchlist.html") != -1)
  ) {
    res.redirect("/login");
  }
  next();
});

// Redirection Route /profile only visible after successful login with a logout link
router.get("/", function(req, res) {
  var db = req.app.locals.db;
  if (req.session.loggedIn === true) {
    res.redirect("/profile");
  } else {
    res.redirect("/login");
  }
});


//Router to dsiplay new user registration or signup page
router.get('/register', (req, res) => {
  res.sendfile('signup.html');
});

//Route for new user signup
router.post('/signup', function(req,res){
  db = req.app.locals.db;
  var username = req.body.username;
  var email =req.body.email;
  var password = req.body.password;
  var reenterpassword = req.body.re_enterpassword;
  if ((db.collection("user").find({username: req.body.username, email: req.body.email}))===null) {
    if (password === reenterpassword) {
      var data = {
        "username": username,
        "email": email,
        "password": password
        };
        db.collection("user").insertOne(
          {username: req.body.username,
          email: req.body.email,
          password: req.body.password}, function(err, response){
            if (err) throw err;
          });
          res.send('You have succesfully signed up.' + '  <a href="/login">Login to access your account now</a>');
          } else {
          res.send('Your password and re-enter password donot match. Please try again.' + '  <a href="/signup">Signup</a>');
            }
          } else {
            res.send('You are already registered. '+'<a href="/login">Login to access your account now</a>');
          }
        });


//Route to reset password page
router.get('/resetpassword', function(req, res) {
  res.sendfile('newpassword.html');
});


//Reset password route
router.post('/newpassword', function(req, res) {
  db = req.app.locals.db;
  if (req.body.password === req.body.retypepassword){
    db.collection('user').updateOne({username: req.body.username},{$set: {password: req.body.password}}, function(err, result) {
        if (err) { throw err; }
        res.send('Password updated successfully' + ' <a href="/login">login now</a>');
      });
    } else {
      res.redirect('/resetpassword');
    }
  });


  // Logout Route /logout to destroy the session
  router.get("/logout", function(req, res) {
    req.session.destroy();
    res.redirect("/");
  });



module.exports = router;
