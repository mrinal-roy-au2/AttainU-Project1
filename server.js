/*jshint esversion: 6*/

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const session = require("express-session");
const mongoClient = require("mongodb").MongoClient;
const userlist = require("./dbfolder/userlist.json");
const path = require("path");
var user = require("./user");
var portfolio = require("./portfolio");
PORT = process.env.PORT || 8080;
const scriptPath = path.join(__dirname, "/scripts");
const cssPath = path.join(__dirname, "/css");
const htmlPath = path.join(__dirname, "/userfiles");
const dbPath = path.join(__dirname, "/dbfolder");
const imgPath = path.join(__dirname, "/images");
const jsPath = path.join(__dirname, '/js');

// var dbURL;

var dbURL = process.env.MY_DB || "mongodb://localhost:27017/";

app.use(session({
    secret: "This is an unknown secret."
  })
);

app.use(bodyParser.urlencoded({ useNewUrlParser: true }));

app.use("/js", express.static(jsPath));
app.use("/userfiles", express.static(htmlPath));
app.use("/scripts", express.static(scriptPath));
app.use("/css", express.static(cssPath));
app.use("/dbfolder", express.static(dbPath));
app.use("/images", express.static(imgPath));
app.use("/user", user);
app.use("/portfolio", portfolio);

mongoClient.connect(
  dbURL,
  function(err, client) {
    if (err) throw err;
    app.locals.db = client.db("userportfolio");
  }
);

/* Home route '/' landing page for all */
app.get("/", function(req, res) {
  if (req.session.loggedIn === true) {
    res.sendfile("indexloggedin.html");
  } else{
    res.sendfile("index.html");
  }
});

app.get("/profile", function(req, res) {
  if(req.session.loggedIn===true){
    res.redirect("/portfolio");
  } else {
    res.redirect('/login');
  }

});

app.get("/marketnews", function(req, res) {
  if(req.session.loggedIn===true){
    res.sendfile("marketnewsloggedin.html");
  } else {
    res.sendfile("marketnews.html");
  }

});


app.listen(PORT, function() {
  var time = new Date();
  console.log(`Server `+ __filename.split("/").pop()+` is Running on PORT ${PORT} at `+time.toTimeString());
});
