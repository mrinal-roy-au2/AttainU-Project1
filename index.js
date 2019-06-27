<<<<<<< HEAD
/*jshint esversion: 6*/

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const userlist = require('./dbfolder/userlist.json');
const path = require('path');
const hbs = require('express-handlebars');
PORT = process.env.PORT||8080;

app.use(session({
    secret: "This is an unknown secret."
}));

app.use(bodyParser.urlencoded());
app.use(express.static('public'));

app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', hbs({defaultLayout: "main"}));
app.set('view engine', 'handlebars');


// opens login & new user page
app.get('/login', (req, res) => {
  res.render('login', {
    title: 'Login Page',
    cssStyle: '.card0{height:100vh}'
  });
});

// Authentication Route to verify user login credentials
app.post('/auth', (req, res) => {
  for (var i=0; i<userlist.length; i++) {
    if ((userlist[i].username === req.body.username) && (userlist[i].password === req.body.password)) {
      req.session.loggedIn = true; }
    }
    res.redirect('/user');
});


/*Checks unauthorsied access to myportfolio & mywatchlist pages*/
app.use((req, res, next) => {
    if (req.session.loggedIn != true && (req.originalUrl.indexOf('/myportfolio.html') != -1 || req.originalUrl.indexOf('mywatchlist.html') != -1)) {
        res.redirect('/login');
    }
    next();
});


/* Home route '/' landing page for all */
app.get('/', (req, res) => {
  res.render('home', {
    title: 'Bluemoon Stock Portfolio Dashboard',
    cssStyle: '.con{height:100vh}.col0{background-color:#fff;height:50vh}.col1{height:100vh}.col2{background-color:#fff}.col3{background-color:#fff;height:50vh}.col4{background-color:#fff;height:50vh}.col5{background-color:#fff;height:50vh}',
    script: '<script type="text/javascript" src="././livescripapis.js">',
    jqcdn: '<script  src="https://code.jquery.com/jquery-3.4.1.min.js"  integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo="  crossorigin="anonymous"></script>'
  });
});


// Redirection Route /profile only visible after successful login with a logout link
app.get('/user', (req, res) => {
    if (req.session.loggedIn === true) {
        res.redirect('/profile');
    } else {
        res.redirect('/login');
    }
});


app.get('/profile', (req, res) => {
  res.redirect('/portfolio');
});


app.get('/portfolio', (req, res) => {
  if (req.session.loggedIn===true) {
    res.render('myportfolio', {
      title: 'My Portfolio',
      cssStyle: '.card0{height:50vh}.card1{height:50vh}',
      script: '</script><script type="text/javascript"src="../../makenewfolio.js"></script>',
      jqcdn: '<script  src="https://code.jquery.com/jquery-3.4.1.min.js"  integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo="  crossorigin="anonymous"></script>'
    });
  } else {
    res.redirect('/login');
  }
});

app.post('/makefolio', (req, res) => {
  console.log(req.body.folioname);
  if (req.session.loggedIn===true) {
    res.render('/myportfolio', {
      folioname: req.body.folioname,
    });
    }
  }
);

// Logout Route /logout to destroy the session
app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login');
});

app.listen(PORT, ()=> {
  var time = new Date();
  console.log(`Server `+__filename.split('/').pop()+` is Running on PORT ${PORT} at `+ time.toTimeString());});
=======
var express = require('express');
var session = require('express-session');
var db = require('./data/user.json');
var bodyParser = require('body-parser');
var app = express();
app.use(session({
    secret: "Express session secret!"
}));
app.use(bodyParser.urlencoded());
app.get('/myportfolio.html', function(req, res) {
    if(req.session.login === true) {
        res.sendfile('./public/myportfolio.html');
}
else {
    res.send("To access your portfolio, you have to login first!" + "<a href='/login.html'>login</a>")
}

   
   });
   //we need to connect mongoDB database instead of /data/user.json
   app.get('/home.html', function(req, res) {
       res.sendfile('public/home.html')
});
app.get('/mywatchlist.html', function(req, res) {
    res.sendfile('public/mywatchlist.html')
});
app.get('/marketnews.html', function(req, res) {
    res.sendfile('public/marketnews.html')
});
app.get('/signup.html', function(req, res) {
    res.sendfile('public/signup.html')
});
   app.get('/login.html', function(req, res) {
    if(req.session.login === true) {
        res.send("You are already logged in!" + " " + "Go to the " + "<a href='/home.html'>Home Page.</a>");
    }
    else{
        res.sendfile('./public/login.html');
}
});
 

//app.use(express.static('public'))



app.post('/signup', function(req, res) {
        db.push(req.body);
        res.send('You have successfully registered to our database.');
        console.log(req.body);

        });    

app.post('/auth', function(req, res) {
    for(var i=0; i<db.length; i++) {
        if(req.body.email === db[i].email && req.body.password === db[i].password) {
            req.session.login = true;
            req.session.userName = db[i].name;
            
        }
    }
    res.redirect('./welcomeuser');
    
});
app.get('/welcomeuser', function(req, res) {
    if(req.session.login == true) {
        res.sendfile('./public/myportfolio.html');
    }
    else {
        res.send("Password or email id is incorrect!" + "Do you want to register as a new user?" + "<a href='/signup.html'>Register Here</a>"
        );
    }
})

 app.get('/logout', function(req, res) {
     req.session.destroy();
    
     res.send("You have successfully logout <a href='/login.html'>login again?</a>");
     //res.redirect('./public/login.html')
     });
app.listen('3000');
>>>>>>> 20d16abcf6c037c3804b6ee485f8a7060163d71d
