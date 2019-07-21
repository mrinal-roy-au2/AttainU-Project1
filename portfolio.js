/*jshint esversion: 6*/

const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const session = require("express-session");
const mongoClient = require("mongodb").MongoClient;
const userlist = require("./dbfolder/userlist.json");
const path = require("path");

//creates a document in user collection with session variables; this document also has an empty portfolio
router.get("/", function(req, res) {
  var db = req.app.locals.db;
  if (req.session.loggedIn === true) {
    res.sendfile("myportfolio.html");
  } else {
    res.redirect("/user/login");
  }
});

//adds a new user document by creating a new document with a new portfolio name and creates an empty array of stocks
router.post("/new", function(req, res) {
  var db = req.app.locals.db;
  if (req.session.loggedIn === true) {
    db.collection("userfolios").insertOne(
      {
        username: req.session.username,
        folioname: req.body.folioname,
        stocks: []
      },
      function(err, result) {
        if (err) throw err;
        console.log("New portfolio created");
        res.end();
      }
    );
  } else {
    res.redirect("/");
  }
});

//add scrips to the user portfolio by pushing stocks array elements
router.post("/addscrip", function(req, res) {
  var db = req.app.locals.db;
  if (req.session.loggedIn === true) {
    // var temp_arr = [];
    var folioname = req.body.folioname;
    var scrip = req.body.scrip;
    var buyprice = req.body.buyprice;
    var qty = req.body.qty;
    console.log("printing value", folioname, scrip, buyprice, qty);
    db.collection("userfolios").updateOne(
      {
        username: req.session.username,
        folioname: req.body.folioname
      },
      {
        $push: {
          stocks: { scrip: scrip, buyprice: buyprice, qty: qty }
        }
      },
      function(err, result) {
        if (err) throw err;
        res.end();
      }
    );
  } else {
    res.redirect("/");
  }
});

//gets the list of folios from the mongo db collection 'userfolio'
router.get("/list", function(req, res) {
  var db = req.app.locals.db;
  console.log("Request for list of folios received");
  db.collection("userfolios").distinct(
    "folioname",
    { username: req.session.username },
    function(err, result) {
      res.json(result);
    }
  );
});

//Receives name of portfolio as input from user & sends list of items in this portfolio
router.post("/performance", function(req, res) {
  var db = req.app.locals.db;
  console.log("Summary Performance in Preparation");   //test line log
  var folioname = req.body.folio_req;
  console.log(folioname);  //test line to check variable folioname

  sendToFrontend(folioname);

  async function sendToFrontend(folioname) {     //outer function
    var allFolioStocks = await fetchFromDB(folioname);
    console.log(allFolioStocks);
    res.send(allFolioStocks);
  }

  async function fetchFromDB(folioname){                      //callback function
    var combined_folios = [];
    var folio_cursor_obj = await db.collection("userfolios").find({ folioname: folioname }).toArray();
    console.log(folio_cursor_obj+"line104");
    for (let i = 0; i < folio_cursor_obj.length; i++) {
      combined_folios = combined_folios.concat(folio_cursor_obj[i].stocks);
    }
    console.log(combined_folios);
    return combined_folios;
  }
});



router.get("/getfolio", function(req, res) {
  var db = req.app.locals.db;
  db.collection("userfolios")
    .find({})
    .toArray(function(err, result) {
      res.json(result);
    });
});

module.exports = router;
