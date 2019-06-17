/*jshint esversion: 6*/

const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoClient = require('mongodb').MongoClient;
const app = express();
const port = 8080;
var db;

app.use(session({
    secret: "This is the twitter secret."
}));

app.use(bodyParser.urlencoded({extended: true}));

mongoClient.connect('mongodb://localhost:27017', function (err, client) {
  if (err) throw err;
  db = client.db('twitter');
  db.collection('tweets').find({}).toArray(function(err, result){  // extra lines to view the db in the console
    if (err) throw err;   // extra lines to view the db in the console
    console.log(result);  // extra lines to view the db in the console
  });
});

app.get('/', (req, res) => {
  res.sendfile('./public/submit.html');
});

app.get('/gettweets', (req, res) => {
  db.collection('tweets').find().toArray(function (err, result) {
    if (err) {throw err;}
    res.json(result);
  });
});

app.post('/myTweet', (req, res) => {
  db.collection('tweets').insertOne(req.body, (err, result) => {
    res.redirect('/');
  });
});


app.listen(port, function () {
  var d = new Date();
  console.log(`Server ${__filename} is running on ${port} at ${d.toLocaleTimeString()} `);
});
