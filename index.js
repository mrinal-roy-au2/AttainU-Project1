/*jshint esversion: 6*/

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const session = require("express-session");
const mongoClient = require("mongodb").MongoClient;
const userlist = require("./dbfolder/userlist.json");
const path = require("path");
PORT = process.env.PORT || 8080;
const scriptPath = path.join(__dirname, "/scripts");
const cssPath = path.join(__dirname, "/stylesheets");
const htmlPath = path.join(__dirname, "/userfiles");
const dbPath = path.join(__dirname, "/dbfolder");
const imgPath = path.join(__dirname, "/images");

// var dbURL;

var dbURL = process.env.MY_DB || "mongodb://localhost:27017/";

app.use(
  session({
    secret: "This is an unknown secret."
  })
);

app.use(bodyParser.urlencoded({ useNewUrlParser: true }));

app.use("/userfiles", express.static(htmlPath));
app.use("/scripts", express.static(scriptPath));
app.use("/stylesheets", express.static(cssPath));
app.use("/dbfolder", express.static(dbPath));
app.use("/images", express.static(imgPath));

mongoClient.connect(
  dbURL,
  function(err, client) {
    if (err) throw err;
    db = client.db("portfolio");
  }
);

/* Home route '/' landing page for all */
app.get("/", function(req, res) {
  res.sendfile("index.html");
});

// opens login & new user page
app.get("/login", function(req, res) {
  if (req.session.loggedIn === true) {
    redirect("/");
  } else {
    res.sendfile("login.html");
  }
});

// Authentication Route to verify user login credentials & creates session variables
app.post("/auth", function(req, res) {
  for (var i = 0; i < userlist.length; i++) {
    if (
      userlist[i].username === req.body.username &&
      userlist[i].password === req.body.password
    ) {
      req.session.loggedIn = true;
      req.session.username = userlist[i].username;
      req.session.password = userlist[i].password;
      req.session.mailID = userlist[i].email;
    }
  }
  res.redirect("/user");
});

/*Checks unauthorsied access to myportfolio & mywatchlist pages*/
app.use(function(req, res, next) {
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
app.get("/user", function(req, res) {
  if (req.session.loggedIn === true) {
    res.redirect("/profile");
  } else {
    res.redirect("/login");
  }
});

app.get("/profile", function(req, res) {
  res.redirect("/portfolio");
});

//creates a document in user collection with session variables; this document also has an empty portfolio
app.get("/portfolio", function(req, res) {
  if (req.session.loggedIn === true) {
    // db.collection('user').insert({"username": req.session.username}, {"password":req.session.password}, {"email":req.session.mailID}, {"userportfolio":[]}, function(err, result){
    //   if (err) throw err;
    //   console.log(result);
    // });
    res.sendfile("myportfolio.html");
  } else {
    res.redirect("/login");
  }
});

//updates the user document by pushing a new portfolio to the array of portfolios for the user
app.post("/makenewfolio", function(req, res) {
  if (req.session.loggedIn === true) {
    db.collection("userfolio").updateOne(
      { username: req.session.username },
      {
        $push: { userportfolio: { folioname: req.body.folioname, stocks: [] } }
      },
      function(err, result) {
        if (err) throw err;
        console.log("New portfolio created");
        res.end();
      }
    );
  } else {
    res.redirect("/portfolio");
  }
});

//add scrips to a user portfolio
app.post("/addscrip", function(req, res) {
  if (req.session.loggedIn === true) {
    // var temp_arr = [];
    var folioname = req.body.folioname;
    var scrip = req.body.scrip;
    var buyprice = req.body.buyprice;
    var qty = req.body.qty;
    console.log("printing value", folioname, scrip, buyprice, qty);
    db.collection("userfolio").updateOne(
      {
        username: req.session.username
      },
      {
        $push: {
          userportfolio: {
            folioname: folioname,
            stocks: { scrip: scrip, buyprice: buyprice, qty: qty }
          }
        }
      },
      function(err, result) {
        if (err) throw err;
        res.end();
      }
    );
  } else {
    res.redirect("/portfolio");
  }
});

//gets the list of folios from the mongo db collection 'userfolio'
app.get("/getfoliolist", function(req, res) {
  console.log("Request for list of folios received");
  db.collection("userfolio").distinct("userportfolio.folioname", function(
    err,
    result
  ) {
    res.json(result);
  });

  // db.collection("userfolio").find({ userportfolio: {folioname:  }, function(err, result) {
  //   console.log(userportfolio);
  // });

  // res.json(folios); //Gives the list of userfolios to AJAX call in makefolio.js to evaluate the summary
});

app.get("/getfolio", function(req, res) {
  db.collection("userfolio")
    .find({})
    .toArray(function(err, result) {
      res.json(result);
    });
});

app.get("/marketnews", function(req, res) {
  res.sendfile("marketnews.html");
});

// Logout Route /logout to destroy the session
app.get("/logout", function(req, res) {
  req.session.destroy();
  res.redirect("/login");
});

app.listen(PORT, function() {
  var time = new Date();
  console.log(
    `Server ` +
      __filename.split("/").pop() +
      ` is Running on PORT ${PORT} at ` +
      time.toTimeString()
  );
});
